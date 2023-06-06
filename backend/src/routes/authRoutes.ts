import express, { Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { OAuth2Client } from 'google-auth-library';

import { IUser, User } from '../models/user'
import { validateReferralCode } from '../util/referralCodes'
import { Errors, TokenPayload, Roles } from '../types';
import { createUser, getUser } from '../controllers/userController';
import { ServerError } from '../middleware/errors';
import { Referral } from '../models/referral';

const router = express.Router();

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

/*
* /signup verifies the referral token is valid and then creates the user
* using the sent user object.
*/
router.route('/signup').post(async (req, res, next) => {
  try {
    // Validate the request body
    const { email, password, referral } = req.body;
    if (!email || !password)
      throw new ServerError(Errors.INVALID_REQUEST_BODY, 400);

    // make sure the referral code is valid
    if (!validateReferralCode(referral))
      throw new ServerError(Errors.INVALID_REFERRAL_CODE, 409);

    // Check if the email address already exists
    const user = await getUser(email, true);
    if (user)
      throw new ServerError(Errors.EMAIl_EXISTS, 409);

    // Create a new user and set token
    const newUser = await createUser({
      email,
      password,
      role: Roles.CONTRACTOR
    })

    // add referral code so it can't be used again
    const referralObj = new Referral({ referral })
    await referralObj.save();

    // Generate a JWT token for the new user
    const token = createAndSetToken(newUser, res);

    // Send the JWT token to the client
    res.status(200).send({ token, user: newUser });
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
    const { clientId, credential } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.OAUTH_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload)
      throw new ServerError(Errors.INVALID_TOKEN, 400);

    let user: IUser | null = await getUser(payload.email!, true);
    if (!user)
      user = await createUser({email: payload.email!, role: Roles.CONTRACTOR})

    const token = createAndSetToken(user, res);

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

    let payload: any;
    try {
      payload = jwt.verify(refreshToken, process.env.JWT_PRIVATE_KEY!);
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
  res.clearCookie('refreshToken');
  res.status(200).send({ message: 'User signed out successfully' });
});

const createAndSetToken = (user: IUser, res: Response) => {
  const tokenPayload : TokenPayload = {
    uid: user.id,
    scope: user.role
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