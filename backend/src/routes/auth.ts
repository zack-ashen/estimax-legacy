import express from 'express'

const router = express.Router();

router.route('/signup').post((req, res) => {
    // Validate the request body
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send('Invalid request body');
      return;
    }
  
    // Check if the email address already exists
    const user = await User.findOne({ email });
    if (user) {
      res.status(409).send('Email address already exists');
      return;
    }
  
    // Create a new user
    const newUser = new User({
      email,
      password,
    });
    await newUser.save();
  
    // Generate a JWT token for the new user
    const token = jwt.sign({ userId: newUser.id }, secret);
  
    // Send the JWT token to the client
    res.status(201).send({ token });
})

router.route('/signin').get((req, res) => {
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
  if (!user.matchPassword(password)) {
    res.status(401).send('Invalid email or password');
    return;
  }

  // Generate a JWT token for the user
  const token = jwt.sign({ userId: user.id }, secret);

  // Send the JWT token to the client
  res.status(200).send({ token });
})


export default router;