import Vendor, { IVendor } from "../models/Vendor/vendor";
import { VendorDto } from "../types/dtos";
import { UserService } from "./user/userService";

class VendorService extends UserService {
  async create(user: VendorDto): Promise<IVendor> {
    let newVendor = await Vendor.create(user);

    return await newVendor.toObject();
  }
}

export default new VendorService();
