import mongoose from 'mongoose';
const { Schema } = mongoose;
import { UserTypes } from '../types';


const userSchema = new Schema({
  uid: {
    type: String,
    default: function() {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  tokenVersion: { type: Number, default: 0 },
  userType: { type: String, enum: Object.values(UserTypes), default: "Contractor"}
  // location: {
  //   type: {
  //     type: String, // Don't do `{ location: { type: String } }`
  //     enum: ['Point'], // 'location.type' must be 'Point'
  //     required: true
  //   },
  //   coordinates: {
  //     type: [Number],
  //     required: true
  //   }
  // },
  // projectRadius: Number,
  // bio: String,
});

export const User = mongoose.model('Users', userSchema)