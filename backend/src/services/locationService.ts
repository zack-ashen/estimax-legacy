import { LRUCache } from "lru-cache";
import { LocationArea } from "../models/sub-schema/locationArea";

export class LocationService {
  cache: LRUCache<string, LocationArea>;

  constructor() {
    this.cache = new LRUCache<string, LocationArea>({
      max: 2000, // max number of items
      ttl: 1209600000, // items expire after 2 weeks
    });
  }
}

export default new LocationService();
