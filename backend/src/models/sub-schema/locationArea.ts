import { Schema } from "mongoose";

export type Coordinates = [
  [number, number],
  [number, number],
  [number, number],
  [number, number],
  [number, number]
];

export interface Region {
  type: "Polygon";
  coordinates: Coordinates;
}

export interface LocationArea {
  name: string;
  region: Region;
  placeId: string;
}

export const LocationAreaSchema = new Schema<LocationArea>({
  name: {
    required: true,
    type: String,
  },
  region: {
    type: {
      type: String,
      enum: ["Polygon"],
      required: true,
    },
    coordinates: {
      type: [[[Number]]],
      required: true,
    },
  },
  placeId: {
    required: true,
    type: String,
  },
});
