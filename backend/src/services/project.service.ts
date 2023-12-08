import { Types } from "mongoose";
import { IProject, Project } from "../models/project.model";
import { ProjectDto } from "../types/dtos";

const ProjectService = {
  create: async (project: ProjectDto): Promise<IProject> => {
    const expirationDate = new Date(project.expirationDate);

    const newProject = new Project({ ...project, expirationDate });
    await newProject.save();
    return await newProject.toObject();
  },

  get: async (id: Types.ObjectId): Promise<IProject> => {
    const project = await Project.findById(id);
    if (!project) throw new Error("Property not found");

    return project.toObject() as IProject;
  },
};

export default ProjectService;
