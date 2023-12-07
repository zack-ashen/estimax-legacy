import { Schema, Types } from "mongoose";

export interface IReview {
  reviewee: Types.ObjectId;
  reviewer: Types.ObjectId;
  title: string;
  description: string;
  photos: string[];
  rating: 1 | 2 | 3 | 4 | 5;
}

const ReviewSchema = new Schema<IReview>(
  {
    reviewee: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: "PropertyManager",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

export default ReviewSchema;
