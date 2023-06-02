import express, { Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { OAuth2Client } from 'google-auth-library';

import { User } from '../models/user'
import { validateReferralCode } from '../util/referralCodes'
import { Errors, TokenPayload, UserType } from '../types';
import { createUser, getUser } from '../controllers/userController';

const router = express.Router();

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

/*
* /signup verifies the referral token is valid and then creates the user
* using the sent user object.
*/
router.route('/signup').post(async (req, res) => {
  // Validate the request body
  // TODO: Pull this validation out into its own middleware
  const { email, password, referral } = req.body;
  if (!email || !password)
    return res.status(400).send({error: 'Invalid request body: email or password invalid'});

  // make sure the referral code is valid
  if (!validateReferralCode(referral))
    return res.status(409).send({error: 'invalid referral code'});

  // Check if the email address already exists
  const user = await getUser(email, true);
  if (user !== Errors.USER_NOT_FOUND)
    return res.status(409).send({error: 'Email address already exists'});


  // Create a new user
  // TODO: replace with createUser
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    email: email,
    password: hashedPassword
  });
  await newUser.save();

  // Generate a JWT token for the new user
  const token = createAndSetToken(newUser, res);

  // Send the JWT token to the client
  res.status(201).send({ token, user: newUser });
});

/*
* /signin logs a user in and validates the email and password is correct.
* returns an access token and user.
*/
router.route('/signin').post(async (req, res) => {
  // Validate the request body
  // TODO: Pull this validation out into its own middleware
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send({error: Errors.INVALID_CRED});

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user || !user.password)
    return res.status(401).send({error: Errors.INVALID_CRED});

  // Check if the password is correct
  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(401).send({error: Errors.INVALID_CRED});

  // Generate a JWT token for the new user
  const token = createAndSetToken(user, res);

  // Send the JWT token to the client
  res.status(200).send({ token, user });
});


/*
* /googleAuth verifies the clientId and credential sent and checks a user
* exists or creates one. It then returns an access token and user.
*/
router.post('/googleAuth', async (req, res) => {
  const { clientId, credential } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.OAUTH_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    res.status(400).send({ error: Errors.INVALID_TOKEN });
    return;
  }

  let user = await User.findOne({ email: payload.email });

  // TODO: replace with create user function
  if (!user) {
    // No user with this Google ID exists, create a new one
    user = new User({
      email: payload.email
    });
    await user.save();
  }


  const token = createAndSetToken(user, res);

  // Send the JWT token and refresh token to the client
  res.status(200).send({ token, user });
});

/* 
*  /refreshToken: either responds with a new access token or no access token.
*  If no refresh token is sent then a token is sent with null value.
*/
router.route('/refreshToken').post(async (req, res) => {
  if (req.cookies?.refreshToken === undefined) {
    return res.status(418).send({ error: Errors.INVALID_REFRESH_TOKEN });
  }

  const refreshToken = req.cookies.refreshToken;

  let payload: any = null;
  try {
    payload = jwt.verify(refreshToken, process.env.JWT_PRIVATE_KEY!);
  } catch (e) {
    return res.status(401).send({ error: Errors.INVALID_REFRESH_TOKEN });
  }

  const user = await User.findOne({ userId: payload.uid });

  if (!user) {
    return res.status(401).send({ error: Errors.INVALID_REFRESH_TOKEN });
  }

  const token = createAndSetToken(user, res);

  return res.send({ token, user });
});

router.route('/signout').post((req, res) => {
  res.clearCookie('refreshToken');
  res.status(200).send({ message: 'User signed out successfully' });
});

const createAndSetToken = (user: UserType, res: Response) => {
  const tokenPayload : TokenPayload = {
    userId: user.uid,
    scope: user.userType
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