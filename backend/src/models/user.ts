import mongoose, { Schema } from 'mongoose';
import { Roles } from '../types';

export interface IUser {
  id?: Schema.Types.ObjectId;
  email: string;
  password?: string;
  role: Roles;
  name: string;
  location?: string;
  searchRadius?: number;
  bio?: string;
  profilePhoto?: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  role: { type: Schema.Types.Mixed, enum: Object.values(Roles), default: "Contractor"},
  name: { type: String },
  location: { type: String, required: false },
  searchRadius: { type: String, required: false },
  bio: { type: String, required: false },
  profilePhoto: { type: String, required: false }
});

export const User = mongoose.model('Users', userSchema)