// Importing required modules
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// Routes
import waitlistRoutes from './routes/waitlistRoutes'
import contractorRoutes from './routes/contractorRoutes'
import homeownerRoutes from './routes/homeownerRoutes'
import userRoutes from './routes/userRoutes'
import projectRoutes from './routes/projectRoutes'
import authRoutes from './routes/authRoutes'

import { errorHandler } from './middleware/errors'

// Load environment variables from .env file
dotenv.config();

// setup morgan
morgan('tiny');

// Initialize app
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.DB_URL!)
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler)

// Routes
app.use('/api/waitlist', waitlistRoutes);
app.use('/api/contractor', contractorRoutes);
app.use('/api/homeowner', homeownerRoutes);
app.use('/api/user', userRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/auth', authRoutes)


// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));