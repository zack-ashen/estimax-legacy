import { IProperty, Property } from "../models/property";
import { Location } from "../models/sub-schema/location";
import { PropertyDto } from "./../types/dtos";

interface CreatePropertyObj extends Omit<PropertyDto, "location"> {
  location: Location;
}

const PropertyService = {
  create: async (property: CreatePropertyObj): Promise<IProperty> => {
    const newProperty = new Property(property);
    await newProperty.save();
    return await newProperty.toObject();
  },

  get: async (id: string): Promise<IProperty> => {
    const property = await Property.findById(id);
    if (!property) throw new Error("Property not found");

    return property.toObject() as IProperty;
  },

  getAll: async (organizationId: string): Promise<IProperty[]> => {
    const properties = await Property.find({
      organization: organizationId,
    });
    return properties.map((property) => property.toObject());
  },
};

export default PropertyService;
