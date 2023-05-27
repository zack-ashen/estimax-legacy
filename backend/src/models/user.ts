import mongoose from 'mongoose';
import { Homeowner } from './homeowner';
const { Schema } = mongoose;

export type UserType = {
  uid: String,
  email: String,
  password: String
}

export enum UserTypes {
  CONTRACTOR = "Contractor",
  HOMEOWNER = "Homeowner"
}

const userSchema = new Schema({
  uid: {
    type: String,
    default: function() {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
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