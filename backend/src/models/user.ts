import mongoose from 'mongoose';
const { Schema } = mongoose;

export type UserType = {

}

const userSchema = new Schema({
  uid: {
    type: String,
    required: true,
    hashKey: true,
    unique: true
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  projectRadius: Number,
  bio: String,
});

export const User = mongoose.model('Users', userSchema)