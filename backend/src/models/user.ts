import mongoose, { Schema } from 'mongoose';
import { UserTypes } from '../types';

export interface IUser extends Document {
  id: Schema.Types.ObjectId;
  email: string;
  password: string;
  userType: UserTypes;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  userType: { type: Schema.Types.Mixed, enum: Object.values(UserTypes), default: "Contractor"}
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