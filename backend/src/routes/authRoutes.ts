import express, { Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { OAuth2Client } from 'google-auth-library';
import { Analytics } from '@segment/analytics-node';

import { IUser } from '../models/user'
import { validateReferralCode } from '../util/referralCodes'
import { Errors, TokenPayload, Roles } from '../types';
import { createUser, getUser } from '../controllers/userController';
import { ServerError } from '../middleware/errors';
import { Referral } from '../models/referral';
import { IHomeowner } from '../models/homeowner';
import { IContractor } from '../models/contractor';

import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_KEY!);

const router = express.Router();

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

const analytics = new Analytics({ 
  writeKey: process.env.SEGMENT_WRITE_KEY!,
  disable: process.env.ENV === 'dev'
})

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
    
    // Create a new user and set token
    const user = await createUser({
      ...newUser,
      password
    })

    analytics.identify({
      userId: user._id.toString(),
      traits: {
        ...user
      }
    })

    analytics.track({
      userId: user._id.toString(),
      event: 'User signed up',
      properties: {
        method: 'Standard Form'
      }
    })

    // Generate a JWT token for the new user
    const token = createAndSetToken(user, res);

    const msg = {
      to: 'zachary.h.a@gmail.com', // Change to your recipient
      from: 'andrew@estimax.us', // Change to your verified sender
      templateId: process.env.SENDGRID_SIGN_UP!
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })

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

    analytics.identify({
      userId: user._id.toString(),
      traits: {
        ...user
      }
    })

    analytics.track({
      userId: user._id.toString(),
      event: 'User signed in',
      properties: {
        method: 'Standard Form'
      }
    })

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

    const newUser = req.body.newUser;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.OAUTH_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload)
      throw new ServerError(Errors.INVALID_TOKEN, 400);

    let user = await getUser(payload.email!, true);
    if (!user && type === 'signup') {
      user = await createUser({...newUser, email: payload.email!, name: payload.name!})

      analytics.track({
        userId: user._id.toString(),
        event: 'User signed up',
        properties: {
          method: 'Google'
        }
      })

      const msg = {
        to: payload.email!, // Change to your recipient
        from: 'andrew@estimax.us', // Change to your verified sender
        templateId: process.env.SENDGRID_SIGN_UP!
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
    } else if (!user && type !== 'signup') {
      throw new ServerError('User does not exist', 400);
    } else {
      analytics.track({
        userId: user?._id.toString(),
        event: 'User signed in',
        properties: {
          method: 'Google'
        }
      })
    }

    analytics.identify({
      userId: user?._id.toString(),
      traits: {
        ...user
      }
    })
    
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

  analytics.track({
    userId: payload.uid.toString(),
    event: 'User signed out'
  })

  res.status(200).send({ message: 'User signed out successfully' });
});

const createAndSetToken = (user: IContractor | IHomeowner, res: Response) => {
  if (!user._id)
    throw new ServerError(Errors.FAILED_SET_TOKEN, 400);

  const tokenPayload : TokenPayload = {
    uid: user._id.toString(),
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