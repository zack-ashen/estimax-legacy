import express from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { User, Referral } from '../models/user'

const router = express.Router();

router.route('/signup').post(async (req, res) => {
    // Validate the request body
    const { email, password, referral } = req.body;
    if (!email || !password) {
      res.status(400).send('Invalid request body: email or password invalid');
      return;
    }

    const checkReferral = await Referral.exists({ referral })
    if (!checkReferral) {
      res.status(409).send('Invalid referral code');
      return;
    }
    await Referral.deleteOne({ brand: 'Nike' }, function (err: string) {
      if(err) console.log(err);
      console.log("Successful deletion");
    });
  
    // Check if the email address already exists
    const user = await User.findOne({ email });
    if (user) {
      res.status(409).send('Email address already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create a new user
    const newUser = new User({
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
  
    // Generate a JWT token for the new user
    const privateKey : Secret = (process.env.JWT_PRIVATE_KEY as string).replace(/\\n/g, '\n');
    const token = jwt.sign({ userId: newUser.uid }, privateKey, { algorithm: 'RS256' });
  
    // Send the JWT token to the client
    res.status(201).send({ token });
});

router.route('/signin').post(async (req, res) => {
  // Validate the request body
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send('Invalid request body');
    return;
  }

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).send('Invalid email or password');
    return;
  }

  // Check if the password is correct
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    res.status(401).send('Invalid email or password');
    return;
  }

  // Generate a JWT token for the new user
  const privateKey : Secret = (process.env.JWT_PRIVATE_KEY as string).replace(/\\n/g, '\n');
  const token = jwt.sign({ userId: user.id }, privateKey, { algorithm: 'RS256' });

  // Send the JWT token to the client
  res.status(200).send({ token });
});


export default router;