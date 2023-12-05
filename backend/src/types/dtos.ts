import { IVendor } from "../models/Vendor/vendor";
import { IProperty } from "../models/property";
import { IUser } from "../models/user";

export interface CreateUserDto
  extends Pick<IUser, "email" | "password" | "role" | "name"> {}

export interface VendorDto
  extends CreateUserDto,
    Pick<IVendor, "services" | "phoneNumber" | "businessName"> {
  location: string; // placeid
}

export interface PropertyManagerDto extends CreateUserDto {}

export interface PropertyDto extends Omit<IProperty, "id" | "location"> {
  location: string;
}
