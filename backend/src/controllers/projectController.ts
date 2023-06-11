import { ServerError } from "../middleware/errors";
import { IProject, Project } from "../models/project";
import { Errors } from "../types";

export async function createProject(project: IProject) {
  // Create a new Project
  const newProject = new Project(project);

  // Save the user to the database
  try {
    await newProject.save();
  } catch (err) {
    console.log(err);
    throw new ServerError(Errors.RESOURCE_CREATION, 409);
  }

  return newProject;
}