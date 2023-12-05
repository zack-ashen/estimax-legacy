import mongoose, { ObjectId, Schema } from "mongoose";
import { LocationSchema } from "./sub-schema/location";

export interface IProperty {
  id: string;
  name: string;
  location: Location;
  organization: ObjectId;
  vendors: ObjectId[];
  media: string[];
  type: string;
  description?: string;
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

propertySchema.virtual("id").get(function () {
  return this._id;
});

export const Property = mongoose.model("Property", propertySchema);
