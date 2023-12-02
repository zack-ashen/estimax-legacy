import { IVendor } from "../models/Vendor/vendor";
import { IUser } from "../models/user";

export interface CreateUserDto
  extends Pick<
    IUser,
    "email" | "password" | "role" | "name" | "businessName"
  > {}

export interface VendorDto
  extends CreateUserDto,
    Pick<IVendor, "services" | "phoneNumber"> {
  location: string; // placeid
}

export interface PropertyManagerDto extends CreateUserDto {}
