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

  get: async (id: string): Promise<IProperty | null> => {
    const property = await Property.findById(id);
    return property ? property.toObject() : null;
  },
};

export default PropertyService;
