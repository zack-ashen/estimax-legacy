import { IProperty } from "../../../models/property";

// GET: /:id/properties.
export type GetPropertiesResponse = {
  properties: IProperty[];
};
