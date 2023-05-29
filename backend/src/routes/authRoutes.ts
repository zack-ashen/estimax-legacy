import express from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { User } from '../models/user'
import { validateReferralCode } from '../util/referralCodes'

const router = express.Router();

router.route('/signup').post(async (req, res) => {
    // Validate the request body
    const { email, password, referral } = req.body;
    if (!email || !password)
      return res.status(400).send({error: 'Invalid request body: email or password invalid'});

    const referralCode : string = referral.substring(0,7);
    const buffer : Buffer = referral.substring(7,).concat("=");
    if (!validateReferralCode(referralCode, buffer))
      return res.status(409).send({error: 'invalid referral code'});
  
    // Check if the email address already exists
    const user = await User.findOne({ email });
    if (user)
      return res.status(409).send({error: 'Email address already exists'});

    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create a new user
    const newUser = new User({
      email: email,
      password: hashedPassword
    });
    await newUser.save();
  
    // Generate a JWT token for the new user
    const privateKey : Secret = (process.env.JWT_PRIVATE_KEY as string).replace(/\\n/g, '\n');
    const token = jwt.sign({ userId: newUser.uid, userType: newUser.userType }, privateKey, { algorithm: 'RS256', expiresIn: '20m' });
    const refreshToken = jwt.sign({ userId: newUser.uid, tokenVersion: newUser.tokenVersion, userType: newUser.userType }, privateKey, { algorithm: 'RS256', expiresIn: '7d' });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: !!process.env.PRODUCTION,
      // SameSite property can be 'strict', 'lax', 'none', or true (for 'strict') 
      sameSite: 'strict' 
    });

    // Send the JWT token to the client
    res.status(201).send({ token, user: newUser });
});

router.route('/signin').post(async (req, res) => {
  // Validate the request body
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send({error: 'Invalid request body'});

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user)
    return res.status(401).send({error: 'Invalid email or password'});

  // Check if the password is correct
  const match = await bcrypt.compare(password, user.password);

  if (!match)
    return res.status(401).send({error: 'Invalid email or password'});

  // Generate a JWT token for the new user
  const privateKey : Secret = (process.env.JWT_PRIVATE_KEY as string).replace(/\\n/g, '\n');
  const token = jwt.sign({ userId: user.uid, userType: user.userType }, privateKey, { algorithm: 'RS256', expiresIn: '20m' });
  const refreshToken = jwt.sign({ userId: user.uid, tokenVersion: user.tokenVersion, userType: user.userType }, privateKey, { algorithm: 'RS256', expiresIn: '7d' });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: !!process.env.PRODUCTION,
    // SameSite property can be 'strict', 'lax', 'none', or true (for 'strict') 
    sameSite: 'strict' 
  });

  // Send the JWT token to the client
  res.status(200).send({ token, user });
});

// router.post('/googleAuth', async (req, res) => {
//   const { id_token } = req.body;

//   const ticket = await client.verifyIdToken({
//     idToken: id_token,
//     audience: 'your-google-oauth-client-id',  // Specify the CLIENT_ID of the app that accesses the backend
//   });

//   const payload = ticket.getPayload();

//   if (!payload) {
//     res.status(400).send({ 'error': 'Invalid Google token' });
//     return;
//   }

//   // You should now have the user's Google ID, email address, and other data in the payload.
//   // You can use these to look up/create the user in your database and generate a JWT.
  
//   let user = await User.findOne({ googleId: payload.sub });

//   if (!user) {
//     // No user with this Google ID exists, create a new one
//     user = new User({
//       googleId: payload.sub,
//       email: payload.email,
//       // add any other relevant fields
//     });
//     await user.save();
//   }

//   const privateKey : Secret = (process.env.JWT_PRIVATE_KEY as string).replace(/\\n/g, '\n');
//   const token = jwt.sign({ userId: user.id }, privateKey, { algorithm: 'RS256' });
//   const refreshToken = jwt.sign({ userId: user.id, tokenVersion: user.tokenVersion }, privateKey, { algorithm: 'RS256', expiresIn: '7d' });

//   // Send the JWT token and refresh token to the client
//   res.status(200).send({ token, refreshToken });
// });

/* Refresh token either responds with a new access token or no access token.
   If no refresh token is sent then a token is sent with null value.
*/
router.route('/refreshToken').post(async (req, res) => {
  if (req.cookies?.refreshToken === undefined) {
    return res.status(418).send({ error: 'No refresh token' });
  }

  const refreshToken = req.cookies.refreshToken;

  let payload: any = null;
  try {
    payload = jwt.verify(refreshToken, process.env.JWT_PRIVATE_KEY!);
  } catch (e) {
    return res.status(401).send({ error: 'Invalid refresh token' });
  }

  const user = await User.findOne({ userId: payload.uid });

  if (!user || user.tokenVersion !== payload.tokenVersion) {
    return res.status(401).send({ error: 'Invalid refresh token' });
  }

  const token = jwt.sign({ userId: user.id, userType: user.userType }, process.env.JWT_PRIVATE_KEY!, { algorithm: 'RS256', expiresIn: '30m' });
  const newRefreshToken = jwt.sign({ userId: user.id, tokenVersion: user.tokenVersion, userType: user.userType }, process.env.JWT_PRIVATE_KEY!, { algorithm: 'RS256', expiresIn: '7d' });
  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: !!process.env.PRODUCTION,
    // SameSite property can be 'strict', 'lax', 'none', or true (for 'strict') 
    sameSite: 'strict' 
  });

  return res.send({ token });
});

router.route('/signout').post((req, res) => {

});


export default router;