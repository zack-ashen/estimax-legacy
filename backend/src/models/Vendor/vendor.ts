import { Schema, Types } from "mongoose";
import { LocationArea, LocationAreaSchema } from "../sub-schema/locationArea";
import { IUser, User } from "../user";
import ReviewSchema, { IReview } from "./review";

export interface IVendor extends IUser {
  services: string[];
  phoneNumber: string;
  savedProjects: Types.ObjectId[];
  securedProjects: Types.ObjectId[];
  biddedProjects: Types.ObjectId[];
  invitedProjects: Types.ObjectId[];
  reviews: IReview[];
  searchRadius: number;
  location: LocationArea;
  businessName: string;
}

const Vendor = User.discriminator(
  "Vendor",
  new Schema<IVendor>({
    businessName: { type: String, required: false },
    services: {
      type: [String],
      required: true,
      default: [],
    },
    phoneNumber: String,
    savedProjects: {
      type: [Schema.Types.ObjectId],
      ref: "Project",
      default: [],
    },
    biddedProjects: {
      type: [Schema.Types.ObjectId],
      ref: "Project",
      default: [],
    },
    securedProjects: {
      type: [Schema.Types.ObjectId],
      ref: "Project",
      default: [],
    },
    invitedProjects: {
      type: [Schema.Types.ObjectId],
      ref: "Project",
      default: [],
    },
    reviews: {
      type: [ReviewSchema],
      default: [],
    },
    searchRadius: {
      type: Number,
      default: 50,
    },
    location: LocationAreaSchema,
  }).index({ "location.region": "2dsphere" })
);

export default Vendor;
