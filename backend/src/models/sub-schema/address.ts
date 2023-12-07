import { Schema } from "mongoose";

export interface IAddress {
  unit?: string;
  addressLine1: string;
  addressLine2: string;
  postalCode?: string;
}

const AddressSchema = new Schema<IAddress>(
  {
    unit: {
      required: false,
      type: String,
    },
    addressLine1: {
      required: true,
      type: String,
    },
    addressLine2: {
      required: true,
      type: String,
    },
    postalCode: {
      required: false,
      type: String,
    },
  },
  { _id: false }
);

export default AddressSchema;
