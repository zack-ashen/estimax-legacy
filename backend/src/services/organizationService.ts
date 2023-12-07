import { IOrganization, Organization } from "../models/organization";
import { IProperty } from "../models/property";
import { OrganizationDto } from "../types/dtos";
import PropertyService from "./propertyService";

class OrganizationService {
  async create(organization: OrganizationDto): Promise<IOrganization> {
    const newOrganization = new Organization(organization);
    await newOrganization.save();
    return newOrganization.toObject();
  }

  async get(id: string): Promise<IOrganization> {
    const organization = await Organization.findById(id);
    if (!organization) throw new Error("Organization not found");
    return organization.toObject();
  }

  async getProperties(id: string): Promise<IProperty[]> {
    const org = await Organization.findById(id);
    if (!org) throw new Error("Organization not found");

    // Manually fetch each property
    const properties = await Promise.all(
      org.properties.map((propertyId) =>
        PropertyService.get(propertyId.toString())
      )
    );

    return properties as IProperty[];
  }

  async addProperty(id: string, propertyId: string): Promise<void> {
    await Organization.updateOne(
      { _id: id },
      { $push: { properties: propertyId } }
    );
  }
}

export default new OrganizationService();
