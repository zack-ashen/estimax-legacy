import { IVendor } from "../models/Vendor/vendor";
import { IUser } from "../models/user";

export interface CreateUserDto
  extends Pick<
    IUser,
    "email" | "password" | "role" | "name" | "businessName"
  > {}

export interface VendorDto
  extends CreateUserDto,
    Pick<IVendor, "vendorType" | "phoneNumber" | "location"> {}

export interface PropertyManagerDto extends CreateUserDto {}
