import mongoose, { Types } from "mongoose";

export interface IOrganization {
  id: Types.ObjectId;
  name: string;
  logo?: string;
  website?: string;
  users: Types.ObjectId[];
  properties: Types.ObjectId[];
  preferredVendors: Types.ObjectId[];
  postedProjects: Types.ObjectId[];
  finishedProjects: Types.ObjectId[];
}

const organizationSchema = new mongoose.Schema<IOrganization>(
  {
    name: { type: String },
    logo: { type: String, required: false },
    website: { type: String, required: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    properties: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Property", default: [] },
    ],

    preferredVendors: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", default: [] },
    ],
    postedProjects: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Project", default: [] },
    ],
    finishedProjects: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Project", default: [] },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret, options) {
        delete ret._id;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (_, ret) {
        delete ret._id;
        return ret;
      },
    },
  }
);

export const Organization = mongoose.model<IOrganization>(
  "Organization",
  organizationSchema
);
