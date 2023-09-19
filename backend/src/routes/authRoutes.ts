import express, { Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { OAuth2Client } from 'google-auth-library';

import { Errors, TokenPayload, Roles } from '../types';
import { createUser, getUser } from '../controllers/userController';
import { ServerError } from '../middleware/errors';
import { IHomeowner } from '../models/homeowner';
import { IContractor } from '../models/contractor';
import { signInEvent, signOutEvent, signUpEvent } from '../util/analytics';
import { sendSignUpEmail } from '../util/email';

const router = express.Router();

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

/*
* /signup verifies the referral token is valid and then creates the user
* using the sent user object.
*/
router.route('/signup').post(async (req, res, next) => {
  try {
    // Validate the request body
    const { newUser, password } = req.body;
    if (!newUser)
      throw new ServerError(Errors.INVALID_REQUEST_BODY, 400);

    // Check if the email address already exists
    const userExists = await getUser(newUser.email, true);
    if (userExists)
      throw new ServerError(Errors.EMAIl_EXISTS, 409);

    // Create a new user
    const user : IHomeowner | IContractor = await createUser({
      ...newUser,
      password
    })

    // Generate a JWT token for the new user
    const token = createAndSetToken(user, res);

    signUpEvent(user.uid.toString(), user);

    sendSignUpEmail(user.email);

    // Send the JWT token to the client
    res.status(200).send({ token, user });
  } catch (err) {
    next(err);
  }
});

/*
* /signin logs a user in and validates the email and password is correct.
* returns an access token and user.
*/
router.route('/signin').post(async (req, res, next) => {
  try {

    // Validate the request body
    const { email, password } = req.body;
    if (!email || !password)
      throw new ServerError(Errors.INVALID_CRED, 400);

    // Check if the user exists
    const user = await getUser(email, true);
    if (!user || !user.password)
      throw new ServerError(Errors.INVALID_CRED, 400);

    // Check if the password is correct
    const match = bcrypt.compare(password, user.password as string);
    if (!match)
      throw new ServerError(Errors.INVALID_CRED, 400);

    signInEvent(user.uid.toString(), user);

    // Generate a JWT token for the new user
    const token = createAndSetToken(user, res);

    // Send the JWT token to the client
    res.status(200).send({ token, user });
  } catch (err) {
    next(err);
  }
});


/*
* /googleAuth verifies the clientId and credential sent and checks a user
* exists or creates one. It then returns an access token and user.
*/
router.post('/googleAuth', async (req, res, next) => {
  try {
    const { clientId, credential, type } = req.body;

    const newUser = req.body.user;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.OAUTH_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload)
      throw new ServerError(Errors.INVALID_TOKEN, 400);

    let user = await getUser(payload.email!, true);
    if (!user && type === 'signup') {
      console.log(newUser.role)
      user = await createUser({...newUser, email: payload.email!, name: payload.name!})

      signUpEvent(user.uid.toString(), user);

      sendSignUpEmail(payload.email!);
    } else if (!user && type !== 'signup') {
      throw new ServerError('User does not exist', 400);
    } else if (user && type === 'signup') {
      throw new ServerError('User already exists. Sign in instead.', 400);
    } else {
      signInEvent(user?.uid.toString()!, user!);
    }
    
    const token = createAndSetToken(user!, res);

    // Send the JWT token and refresh token to the client
    res.status(200).send({ token, user });
  } catch (err) {
    next(err);
  }
});

/* 
*  /refreshToken: either responds with a new access token or no access token.
*  If no refresh token is sent then a token is sent with null value.
*/
router.route('/refreshToken').post(async (req, res, next) => {
  try {
    if (!req.cookies?.refreshToken)
      throw new ServerError(Errors.INVALID_REFRESH_TOKEN, 418);

    const refreshToken = req.cookies.refreshToken;

    let payload: TokenPayload;
    try {
      payload = jwt.verify(refreshToken, process.env.JWT_PRIVATE_KEY!) as TokenPayload;
    } catch {
      throw new ServerError(Errors.INVALID_REFRESH_TOKEN, 401);
    }

    const user = await getUser(payload.uid);
    if (!user)
      throw new ServerError(Errors.INVALID_REFRESH_TOKEN, 401);

    const token = createAndSetToken(user, res);

    return res.send({ token, user });
  } catch (err) {
    next(err)
  }
});

router.route('/signout').post((req, res) => {
  const token = req.cookies.refreshToken;
  const payload = jwt.verify(token, process.env.JWT_PRIVATE_KEY!) as TokenPayload;

  res.clearCookie('refreshToken');

  signOutEvent(payload.uid);

  res.status(200).send({ message: 'User signed out successfully' });
});

const createAndSetToken = (user: IContractor | IHomeowner, res: Response) => {
  if (!user.uid)
    throw new ServerError(Errors.FAILED_SET_TOKEN, 400);

  const tokenPayload : TokenPayload = {
    uid: user.uid.toString(),
    role: user.role
  }

  const privateKey : Secret = (process.env.JWT_PRIVATE_KEY as string).replace(/\\n/g, '\n');
  const token = jwt.sign(tokenPayload, privateKey, { algorithm: 'RS256', expiresIn: '20m' });
  const refreshToken = jwt.sign(tokenPayload, privateKey, { algorithm: 'RS256', expiresIn: '7d' });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: !!process.env.PRODUCTION,
    sameSite: 'strict' 
  });
  
  return token;
}


export default router;