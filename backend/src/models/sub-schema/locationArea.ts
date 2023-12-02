import { Schema } from "mongoose";

export interface LocationArea {
  name: string;
  region: {
    type: "Polygon";
    coordinates: [
      [number, number],
      [number, number],
      [number, number],
      [number, number]
    ];
  };
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
