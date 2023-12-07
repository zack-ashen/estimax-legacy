import { Schema } from "mongoose";
import AddressSchema, { IAddress } from "./address";

export interface Location {
  area: string;
  address: IAddress;
  point: [number, number]; // long and lat
  placeId: string;
}

export const LocationSchema = new Schema<Location>(
  {
    area: String,
    address: AddressSchema,
    point: [Number, Number],
    placeId: String,
  },
  { _id: false }
);
