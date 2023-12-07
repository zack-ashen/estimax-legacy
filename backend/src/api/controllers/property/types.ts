import { IProperty } from "../../../models/property.model";
import { PropertyDto } from "../../../types/dtos";

// Create Property
export type CreateRequest = {
  property: PropertyDto;
};

export type CreateResponse = {
  property: string;
};

// Get Property
export type GetResponse = {
  property: IProperty;
};

// Get All Properties
export type GetAllResponse = {
  properties: IProperty[];
};
