import { ObjectId, Schema } from "mongoose";
import { IUser, User } from "./user";

export interface IPropertyManager extends IUser {
  preferredVendors: ObjectId[];
  postedProjects: ObjectId[];
  finishedProjects: ObjectId[];
}

const PropertyManager = User.discriminator(
  "PropertyManager",
  new Schema<IPropertyManager>({
    preferredVendors: {
      type: [Schema.Types.ObjectId],
      ref: "Vendor",
      default: [],
    },
    postedProjects: {
      type: [Schema.Types.ObjectId],
      ref: "Project",
      default: [],
    },
    finishedProjects: {
      type: [Schema.Types.ObjectId],
      ref: "Project",
      default: [],
    },
  })
);

export default PropertyManager;
