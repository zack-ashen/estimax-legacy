import mongoose, { Schema } from 'mongoose';

export interface IReferral extends Document {
  referral: string;
}

const referralSchema = new Schema<IReferral>({
  referral: String
});

export const Referral = mongoose.model('Referral', referralSchema)