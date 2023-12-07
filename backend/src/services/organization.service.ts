import { Types } from "mongoose";
import { IOrganization, Organization } from "../models/organization.model";
import { IProperty, Property } from "../models/property.model";
import { OrganizationDto } from "../types/dtos";

class OrganizationService {
  async create(organization: OrganizationDto): Promise<IOrganization> {
    const newOrganization = new Organization(organization);
    await newOrganization.save();
    return newOrganization.toObject();
  }

  async get(id: Types.ObjectId): Promise<IOrganization> {
    const organization = await Organization.findById(id);
    if (!organization) throw new Error("Organization not found");
    return organization.toObject();
  }

  async getProperties(orgId: Types.ObjectId): Promise<IProperty[]> {
    const properties = await Property.find({ organization: orgId });
    return properties.map((property) => property.toObject());
  }

  async addProperty(
    orgId: Types.ObjectId,
    propertyId: Types.ObjectId
  ): Promise<void> {
    await Organization.updateOne(
      { _id: orgId },
      { $push: { properties: propertyId } }
    );
  }
}

export default new OrganizationService();
