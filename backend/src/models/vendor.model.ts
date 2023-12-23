import { Schema, Types } from "mongoose";
import { ILocationArea, LocationAreaSchema } from "./sub-schema/locationArea";
import ReviewSchema, { IReview } from "./sub-schema/review";
import { IUser, User } from "./user.model";

export interface IVendor extends IUser {
  services: string[];
  phoneNumber: string;
  savedProjects: Types.ObjectId[];
  securedProjects: Types.ObjectId[];
  bids: Types.ObjectId[];
  invitedProjects: Types.ObjectId[];
  reviews: IReview[];
  searchRadius: number;
  location: ILocationArea;
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
    bids: [{ type: Schema.Types.ObjectId, ref: "Bid" }],
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
