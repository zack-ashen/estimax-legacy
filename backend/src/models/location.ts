import { Schema } from "mongoose";

export interface Location {
    area: string;
    address: Address;
    point: [number, number]; // long and lat
    placeId: string;
}

export interface LocationArea {
    name: string;
    region: {
        type: 'Polygon';
        coordinates: [[number, number], [number, number], [number, number], [number, number]];
    };
    placeId: string;
}
  
  
export interface Address {
    unit?: string;
    addressLine1: string;
    addressLine2: string;
    postalCode?: string;
}
  
const AddressSchema = new Schema<Address>({
    unit: {
        required: false,
        type: String
    },
    addressLine1: {
        required: true,
        type: String
    },
    addressLine2: {
        required: true,
        type: String
    },
    postalCode: {
        required: false,
        type: String
    }
})

export const LocationAreaSchema = new Schema<LocationArea>({
    name: {
        required: true,
        type: String
    },
    region: {
        type: {
            type: String,
            enum: ['Polygon'],
            required: true
          },
        coordinates: {
            type: [[[Number]]],
            required: true
        }
    },
    placeId: {
        required: true,
        type: String
    }
})
  
export const LocationSchema = new Schema<Location>({
    area: String,
    address: AddressSchema,
    point: [Number, Number],
    placeId: String
})