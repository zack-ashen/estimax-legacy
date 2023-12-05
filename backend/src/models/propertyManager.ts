import { ObjectId, Schema } from "mongoose";
import { IUser, User } from "./user";

export interface IPropertyManager extends IUser {
  organization: ObjectId;
  personal: boolean;
}

const PropertyManager = User.discriminator(
  "PropertyManager",
  new Schema<IPropertyManager>({
    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
    },
    personal: { type: Boolean, default: true },
  })
);

export default PropertyManager;
