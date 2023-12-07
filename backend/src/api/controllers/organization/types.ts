import { IProperty } from "../../../models/property.model";

// GET: /:id/properties.
export type GetPropertiesResponse = {
  properties: IProperty[];
};
