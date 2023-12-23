import { SearchQuery } from "../api/controllers/vendor/types";
import Vendor, { IVendor } from "../models/vendor.model";
import { UserService } from "./user/user.service";

import { Document, FilterQuery, Types } from "mongoose";

class VendorService extends UserService {
  async search(
    query: SearchQuery,
    page: number,
    limit: number = 10
  ): Promise<IVendor[]> {
    const offset = (page - 1) * limit;

    const queryConditions: FilterQuery<typeof Vendor> = {};

    // Fuzzy search by name
    if (query.name) {
      queryConditions.name = new RegExp(query.name, "i");
    }

    // Fuzzy search by phoneNumber
    if (query.phoneNumber) {
      queryConditions.phoneNumber = new RegExp(query.phoneNumber, "i");
    }

    // Filter based on number of bids
    if (query.email) {
      queryConditions.email = new RegExp(query.email, "i");
    }

    if (query.location) {
      queryConditions["location.placeId"] = query.location;
    }

    if (query.services && query.services.length) {
      queryConditions.services = { $in: query.services };
    }

    let vendors = await Vendor.aggregate([
      { $match: queryConditions },
      {
        $addFields: {
          servicesOverlapCount: {
            $size: { $setIntersection: ["$services", query.services] },
          },
        },
      },
      { $match: { servicesOverlapCount: { $gte: 1, $lte: 2 } } },
      { $skip: offset },
      { $limit: limit },
    ]);

    return vendors.map((vendor: Document<IVendor>) => vendor.toObject());
  }

  async bids(id: Types.ObjectId) {
    const vendor = await Vendor.findById(id).populate("bids");

    if (!vendor) {
      throw new Error("Vendor not found");
    }

    return vendor.bids;
  }
}

export default new VendorService();
