import { Types } from "mongoose";
import { IOrganization, Organization } from "../models/organization.model";
import { IProject } from "../models/project.model";
import { OrganizationDto } from "../types/dtos";
import { IProperty } from "./../models/property.model";

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
    const org = await Organization.findById(orgId)
      .populate("properties")
      .exec();

    if (!org) throw new Error("Organization not found");

    return org.properties.map((property) => property.toObject());
  }

  async getProjects(orgId: Types.ObjectId): Promise<IProject[]> {
    const org = await Organization.findById(orgId)
      .populate("postedProjects")
      .exec();

    if (!org) throw new Error("Organization not found");

    return org.postedProjects.map((project) => project.toObject());
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

  async addProject(
    orgId: Types.ObjectId,
    projectId: Types.ObjectId
  ): Promise<void> {
    await Organization.updateOne(
      { _id: orgId },
      { $push: { postedProjects: projectId } }
    );
  }

  async getVendors(orgId: Types.ObjectId): Promise<IOrganization[]> {
    const org = await Organization.findById(orgId)
      .populate("preferredVendors")
      .exec();

    if (!org) throw new Error("Organization not found");

    return org.preferredVendors.map((vendor) => vendor.toObject());
  }
}

export default new OrganizationService();
