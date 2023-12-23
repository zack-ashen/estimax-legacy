import { IVendor } from "../../../models/vendor.model";
import { QueryDetails } from "../../../types";

export type SearchRequest = {
  query: SearchQuery;
  queryDetails: QueryDetails;
};

export type SearchResponse = {
  vendors: IVendor[];
};

export type SearchQuery = {
  name?: string;
  phoneNumber?: string;
  email?: string;
  location?: string;
  services?: [string];
  reviews?: 1 | 2 | 3 | 4 | 5;
};
