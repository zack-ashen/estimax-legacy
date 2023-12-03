import { Schema } from "mongoose";
import AddressSchema, { Address } from "./address";

export interface Location {
  area: string;
  address: Address;
  point: [number, number]; // long and lat
  placeId: string;
}

export const LocationSchema = new Schema<Location>({
  area: String,
  address: AddressSchema,
  point: [Number, Number],
  placeId: String,
});
