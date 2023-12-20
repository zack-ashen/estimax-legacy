import mongoose, { Schema, Types } from "mongoose";
import { ProjectStatus } from "../types";
import { Media, MediaSchema } from "./sub-schema/media";

export interface IProject {
  id: Types.ObjectId;
  name: string;
  property: {
    id: Types.ObjectId;
    name: string;
  };
  expirationDate: Date;
  dynamicBidding: boolean;
  media: Media[];
  public: boolean;
  description: string;
  status: ProjectStatus;
  bids: Types.ObjectId[];
  invitedVendors: Types.ObjectId[];
}

const projectSchema = new Schema<IProject>(
  {
    name: String,
    property: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
      name: { type: String },
    },
    expirationDate: Date,
    dynamicBidding: Boolean,
    public: Boolean,
    description: String,
    media: [{ type: MediaSchema, default: [] }],
    status: {
      type: String,
      enum: ProjectStatus,
      default: ProjectStatus.IN_PROGRESS,
    },
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid", default: [] }],
    invitedVendors: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", default: [] },
    ],
  },
  {
    toObject: {
      virtuals: true,
      transform: function (_, ret) {
        delete ret.__v;
        delete ret._id;
        return ret;
      },
    },
  }
);

projectSchema.virtual("id").get(function () {
  return this._id;
});

export const Project = mongoose.model<IProject>("Project", projectSchema);
