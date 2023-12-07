import mongoose, { Schema, Types } from "mongoose";
import { Location, LocationSchema } from "./sub-schema/location";

export interface IProperty {
  id: Types.ObjectId;
  name: string;
  location: Location;
  organization: Types.ObjectId;
  vendors: string[];
  media: string[];
  type: string;
  description?: string;
  projects: Types.ObjectId[];
  activeProjects: Types.ObjectId[];
}

const propertySchema = new Schema<IProperty>(
  {
    name: { type: String, required: true },
    location: { type: LocationSchema },
    organization: { type: Schema.Types.ObjectId, ref: "Organization" },
    vendors: [{ type: Schema.Types.ObjectId, ref: "Vendor", default: [] }],
    media: [{ type: String, default: [] }],
    type: { type: String },
    description: { type: String, required: false },
    projects: [{ type: Schema.Types.ObjectId, ref: "Project", default: [] }],
    activeProjects: [
      { type: Schema.Types.ObjectId, ref: "Project", default: [] },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (_, ret) {
        ret.organization = ret.organization.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

propertySchema.virtual("id").get(function () {
  return this._id;
});

export const Property = mongoose.model<IProperty>("Property", propertySchema);
