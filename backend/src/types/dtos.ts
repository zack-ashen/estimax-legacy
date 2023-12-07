import { IVendor } from "../models/Vendor/vendor";
import { IOrganization } from "../models/organization";
import { IProperty } from "../models/property";
import { IPropertyManager } from "../models/propertyManager";
import { IUser } from "../models/user";

export interface CreateUserDto extends Partial<IUser> {}

export interface VendorDto extends Partial<Omit<IVendor, "location">> {
  location: string; // placeid
}

export interface PropertyManagerDto extends Partial<IPropertyManager> {}

export interface PropertyDto extends Partial<Omit<IProperty, "location">> {
  location: string;
}

export interface OrganizationDto extends Partial<IOrganization> {}
