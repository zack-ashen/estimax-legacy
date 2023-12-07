import Vendor, { IVendor } from "../models/Vendor/vendor";
import { UserService } from "./user/userService";

import { Document } from "mongoose";

class VendorService extends UserService {
  async search(
    name: string,
    phoneNumber: string,
    limit: number
  ): Promise<IVendor[]> {
    const vendors = await Vendor.find({
      name: { $regex: name, $options: "i" },
      phoneNumber: { $regex: phoneNumber, $options: "i" },
    }).limit(limit);

    return vendors.map((vendor: Document<IVendor>) => vendor.toObject());
  }
}

export default new VendorService();
