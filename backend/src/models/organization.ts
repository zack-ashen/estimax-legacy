import mongoose, { ObjectId } from "mongoose";

interface IOrganization {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  users: ObjectId[];
  properties: ObjectId[];
  preferredVendors: ObjectId[];
  postedProjects: ObjectId[];
  finishedProjects: ObjectId[];
}

const organizationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    logo: { type: String, required: false },
    website: { type: String, required: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
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

organizationSchema.virtual("id").get(function () {
  return this._id;
});

export const Organization = mongoose.model("Organization", organizationSchema);
