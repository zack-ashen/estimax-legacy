import { Types } from "mongoose";
import { SearchQuery } from "../api/controllers/project/types";
import { IProject, Project } from "../models/project.model";
import { ProjectDto } from "../types/dtos";
import mediaService from "./media.service";

const ProjectService = {
  create: async (project: ProjectDto): Promise<IProject> => {
    const newProject = new Project(project);
    await newProject.save();
    return await newProject.toObject();
  },

  get: async (id: Types.ObjectId): Promise<IProject> => {
    const project = await Project.findById(id);
    if (!project) throw new Error("Property not found");

    return project.toObject() as IProject;
  },

  search: async (query: SearchQuery, limit = 5): Promise<IProject[]> => {
    const projects = await Project.find(query).limit(limit);
    return projects.map((project) => project.toObject());
  },

  parseMedia: async (project: IProject): Promise<IProject> => {
    const { media } = project;
    if (!media) return project;

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

    return {
      ...project,
      media: parsedMedia,
    };
  },

  parseMedias: async (projects: IProject[]): Promise<IProject[]> => {
    const parsedProjects = await Promise.all(
      projects.map(async (project) => {
        return await ProjectService.parseMedia(project);
      })
    );

    return parsedProjects;
  },
};

export default ProjectService;
