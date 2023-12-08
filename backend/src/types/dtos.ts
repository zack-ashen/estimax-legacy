import { IOrganization } from "../models/organization.model";
import { IProperty } from "../models/property.model";
import { IPropertyManager } from "../models/propertyManager.model";
import { IUser } from "../models/user.model";
import { IVendor } from "../models/vendor.model";

export interface CreateUserDto extends Partial<IUser> {}

export interface VendorDto extends Partial<Omit<IVendor, "location">> {
  location: string; // placeid
}

export interface PropertyManagerDto extends Partial<IPropertyManager> {}

export interface PropertyDto extends Partial<Omit<IProperty, "location">> {
  location: string;
}

export interface OrganizationDto extends Partial<IOrganization> {}

export interface ProjectDto extends Partial<IProperty> {
  expirationDate: string;
}
