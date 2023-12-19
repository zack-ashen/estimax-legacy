import { Schema } from "mongoose";

export interface Media {
  accessString: string;
  type: string;
  name: string;
  size: number;
  url?: true;
}

export const MediaSchema = new Schema<Media>(
  {
    accessString: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    url: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);
