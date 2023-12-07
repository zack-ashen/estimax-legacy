import mongoose, { Schema, Types } from "mongoose";
import { Role } from "../types";

export interface IUser {
  id: Types.ObjectId;
  email: string;
  password?: string;
  role: Role;
  name: string;
  bio?: string;
  profilePhoto?: string;
  businessName?: string;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    name: { type: String },
    bio: { type: String, required: false },
    profilePhoto: { type: String, required: false },
    businessName: { type: String, required: false },
    role: {
      type: String,
      enum: [Role.PROPERTY_MANAGER, Role.VENDOR],
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret, options) {
        delete ret.password;
        delete ret.__v;
        delete ret.__t;
        delete ret._id;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (_, ret) {
        delete ret.__v;
        delete ret.__t;
        delete ret._id;
        return ret;
      },
    },
  }
);

userSchema.virtual("id").get(function () {
  return this._id;
});

export const User = mongoose.model<IUser>("User", userSchema);
