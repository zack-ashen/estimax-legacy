import { Schema } from "mongoose";

export interface Address {
  unit?: string;
  addressLine1: string;
  addressLine2: string;
  postalCode?: string;
}

const AddressSchema = new Schema<Address>({
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
});

export default AddressSchema;
