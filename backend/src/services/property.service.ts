import { Types } from "mongoose";
import { IProject } from "../models/project.model";
import { IProperty, Property } from "../models/property.model";
import { Location } from "../models/sub-schema/location";
import { PropertyDto } from "../types/dtos";

interface CreatePropertyObj extends Omit<PropertyDto, "location"> {
  location: Location;
}

const PropertyService = {
  create: async (property: CreatePropertyObj): Promise<IProperty> => {
    const newProperty = new Property(property);
    await newProperty.save();
    return await newProperty.toObject();
  },

  get: async (id: Types.ObjectId): Promise<IProperty> => {
    const property = await Property.findById(id);
    if (!property) throw new Error("Property not found");

    return property.toObject() as IProperty;
  },

  getProjects: async (id: Types.ObjectId): Promise<IProject[]> => {
    const property = await Property.findById(id).populate("projects").exec();

    if (!property) throw new Error("Organization not found");

    return property.projects.map((project) => project.toObject());
  },
};

export default PropertyService;
