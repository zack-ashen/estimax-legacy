import { IProject } from "../../../models/project.model";
import { IProperty } from "../../../models/property.model";

// GET: /:id/properties.
export type GetPropertiesResponse = {
  properties: IProperty[];
};

// GET: /:id/projects.
export type GetProjectsResponse = {
  projects: IProject[];
};
