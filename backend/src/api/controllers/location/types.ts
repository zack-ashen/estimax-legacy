import { PlaceAutocompleteResult } from "@googlemaps/google-maps-services-js";

export type SearchQuery = {
  value: string;
  type: "cities" | "address";
  limit: number;
};

export type SearchResponse = {
  locations: PlaceAutocompleteResult[];
};
