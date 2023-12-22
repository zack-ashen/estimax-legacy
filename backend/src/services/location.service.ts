import {
  AddressType,
  Client,
  LatLngBounds,
  PlaceAutocompleteRequest,
  PlaceAutocompleteResponseData,
  PlaceAutocompleteType,
} from "@googlemaps/google-maps-services-js";
import { LRUCache } from "lru-cache";
import { IAddress } from "../models/sub-schema/address";
import { Location } from "../models/sub-schema/location";
import {
  Coordinates,
  ILocationArea,
  Region,
} from "../models/sub-schema/locationArea";

export class LocationService {
  private cache: LRUCache<string, PlaceAutocompleteResponseData>;
  googleMapsClient: Client;
  apiKey: string;

  constructor() {
    this.cache = new LRUCache<string, PlaceAutocompleteResponseData>({
      max: 2000, // max number of items
      ttl: 1209600000, // items expire after 2 weeks
    });
    this.googleMapsClient = new Client({});
    this.apiKey = process.env.GOOGLE_MAPS_API!;
  }

  async search(limit: number, type: string, value: string) {
    const cacheKey = `limit=${limit}-type=${type}-value=${value}`;
    const cachedLocation = this.cache.get(cacheKey);

    if (cachedLocation) {
      console.log("Cache hit");
      return cachedLocation.predictions.slice(0, limit);
    }

    const suggestions = await this.getPlaceSuggestions(value, type);

    this.cache.set(cacheKey, suggestions);

    return suggestions.predictions.slice(0, limit);
  }

  public async getPlaceSuggestions(
    value: string,
    type: string
  ): Promise<PlaceAutocompleteResponseData> {
    const params: PlaceAutocompleteRequest = {
      params: {
        input: value,
        components: ["country:us"],
        key: this.apiKey,
        types:
          type === "cities"
            ? PlaceAutocompleteType.cities
            : PlaceAutocompleteType.address,
      },
    };

    const response = await this.googleMapsClient.placeAutocomplete(params);

    return response.data;
  }

  public async getPlaceDetails(placeId: string) {
    const placeDetails = await this.googleMapsClient.placeDetails({
      params: {
        key: this.apiKey,
        place_id: placeId,
      },
    });

    return placeDetails.data.result;
  }

  // Precondition: placeId is for a region, not a specific address
  public async locationAreaFromPlaceId(
    placeId: string
  ): Promise<ILocationArea> {
    const placeDetails = await this.getPlaceDetails(placeId);

    if (!placeDetails.geometry) {
      throw new Error("Place details missing geometry");
    }

    const viewport = placeDetails.geometry.viewport;
    const region: Region = {
      type: "Polygon",
      coordinates: this.viewportToPolygon(viewport),
    };
    const name = placeDetails.name!;

    return {
      placeId,
      region,
      name,
    };
  }

  public async getLocation(placeId: string): Promise<Location> {
    const placeDetails = await this.getPlaceDetails(placeId);

    if (!placeDetails.geometry) {
      throw new Error("Place details missing geometry");
    }

    // Extract the latitude and longitude
    const { lat, lng } = placeDetails.geometry.location;
    const point: [number, number] = [lng, lat];

    // Initialize an empty address object
    const address: IAddress = {
      addressLine1: "",
      addressLine2: "",
    };

    // Populate the address object based on the address components
    placeDetails.address_components?.forEach((component) => {
      if (!component.types.every(this.isValidAddressType)) {
        throw new Error("Invalid address type encountered");
      }

      const types = component.types as AddressType[];
      if (types.includes("street_number" as AddressType)) {
        address.addressLine1 += `${component.long_name} `;
      } else if (types.includes("route" as AddressType)) {
        address.addressLine1 += component.long_name;
      } else if (types.includes("subpremise" as AddressType)) {
        address.unit = component.long_name;
      } else if (types.includes("postal_code" as AddressType)) {
        address.postalCode = component.long_name;
      } else if (
        types.includes("locality" as AddressType) ||
        types.includes("administrative_area_level_1" as AddressType)
      ) {
        address.addressLine2 += `${component.long_name}, `;
      }
    });

    // Trim the trailing comma and space from addressLine2
    address.addressLine2 = address.addressLine2.trim().replace(/,$/, "");

    return {
      area: placeDetails.name!,
      address: address,
      point: point,
      placeId: placeId,
    };
  }

  private isValidAddressType(type: string): type is AddressType {
    return Object.values(AddressType).includes(type as AddressType);
  }

  private viewportToPolygon(viewport: LatLngBounds): Coordinates {
    const { northeast, southwest } = viewport;
    const { lat: north, lng: east } = northeast;
    const { lat: south, lng: west } = southwest;

    // Coordinates array should form a closed loop, tracing around the rectangle
    return [
      [west, north], // Northwest corner
      [east, north], // Northeast corner
      [east, south], // Southeast corner
      [west, south], // Southwest corner
      [west, north], // Back to Northwest corner to close the loop
    ];
  }
}

export default new LocationService();
