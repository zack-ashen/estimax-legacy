import { FilterQuery, UpdateQuery } from "mongoose";
import { ServerError } from "../middleware/errors";
import { IBid, IProject, Project } from "../models/project";
import { Errors, ProjectDraft } from "../types";

export async function createProject(project: ProjectDraft): Promise<IProject> {
  // Create a new Project
  const newProject = new Project(project);

  // Save the user to the database
  try {
    await newProject.save();
  } catch (err) {
    console.log(err);
    throw new ServerError(Errors.RESOURCE_CREATION, 409);
  }

  return newProject.toObject();
}



export async function getProject(id: string) {
  const project = await Project.findById(id);

  return project ? project.toObject() : null;
}

export async function getProjects(filterQuery: FilterQuery<IProject>, limit?: number, offset?: number) {
  const projects = await Project.find(filterQuery).limit(limit ? +limit : 0).skip(offset ? +offset : 0);

  return projects.map(project => project.toObject());
}


export async function updateProject(id: string, updateQuery: UpdateQuery<IProject>) {
  const project = await Project.findByIdAndUpdate(id, updateQuery, { new: true});

  return project ? project.toObject() : null;
}