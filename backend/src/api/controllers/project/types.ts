import { ProjectDto } from "../../../types/dtos";
import { IProject } from "./../../../models/project.model";

// Create Project
export type CreateRequest = {
  project: ProjectDto;
};

export type CreateResponse = {
  project: string;
};

// Get Project
export type GetResponse = {
  project: IProject;
};

// Get Projects by Query
export type SearchRequest = {
  query: SearchQuery;
  limit: number;
};

export type SearchQuery = {
  name?: string;
};
