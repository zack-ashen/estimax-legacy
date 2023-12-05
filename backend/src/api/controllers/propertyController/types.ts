import { PropertyDto } from "../../../types/dtos";

export type CreateRequest = {
  property: PropertyDto;
};

export type CreateResponse = {
  property: string;
};
