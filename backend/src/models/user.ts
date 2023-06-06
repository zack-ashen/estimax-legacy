import mongoose, { Schema } from 'mongoose';
import { Roles } from '../types';

export interface IUser extends Document {
  id: Schema.Types.ObjectId;
  email: string;
  password: string;
  role: Roles;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  role: { type: Schema.Types.Mixed, enum: Object.values(Roles), default: "Contractor"}
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