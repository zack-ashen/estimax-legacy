import { Types } from "mongoose";
import { IProject } from "../models/project.model";
import { IProperty, Property } from "../models/property.model";
import { Location } from "../models/sub-schema/location";
import { PropertyDto } from "../types/dtos";
import mediaService from "./media.service";
import projectService from "./project.service";

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

  parseMedia: async (property: IProperty): Promise<IProperty> => {
    const { media } = property;
    if (!media) return property;

    const parsedMediaPromises = media.map(async (mediaItem) => {
      const accessString = await mediaService.generatePresignedUrl(
        mediaItem.accessString
      );
      return {
        ...mediaItem,
        accessString, // This will overwrite the old accessString
      };
    });

    // Wait for all promises to resolve
    const parsedMedia = await Promise.all(parsedMediaPromises);

    const parsedProjectMedia = await projectService.parseMedias(
      property.projects
    );

    return {
      ...property,
      projects: parsedProjectMedia,
      media: parsedMedia,
    };
  },

  parseMedias: async (properties: IProperty[]): Promise<IProperty[]> => {
    const parsedProperties = await Promise.all(
      properties.map(async (property) => {
        return await PropertyService.parseMedia(property);
      })
    );

    return parsedProperties;
  },

  addProject: async (projectId: Types.ObjectId, propertyId: Types.ObjectId) => {
    const property = await Property.findById(propertyId);

    if (!property) throw new Error("Property not found");

    property.projects.push(projectId);
    await property.save();
  },

  getProjects: async (id: Types.ObjectId): Promise<IProject[]> => {
    const property = await Property.findById(id).populate("projects").exec();

    if (!property) throw new Error("Organization not found");

    return property.projects.map((project) => project.toObject());
  },
};

export default PropertyService;
