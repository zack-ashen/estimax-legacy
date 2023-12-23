import { FilterQuery, Types } from "mongoose";
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

  search: async (
    query: SearchQuery,
    page: number,
    limit: number = 10
  ): Promise<IProject[]> => {
    const offset = (page - 1) * limit;

    let queryConditions: FilterQuery<typeof Project> = {};

    // Fuzzy search by name
    if (query.name) {
      queryConditions.name = new RegExp(query.name, "i");
    }

    // Filter based on number of bids
    if (query.numberOfBids) {
      if (query.numberOfBids >= 0) {
        queryConditions.bids = { $size: query.numberOfBids };
      } else {
        queryConditions.bids = { $not: { $size: -query.numberOfBids } };
      }
    }

    // Time left to bid
    if (query.timeLeftToBid) {
      const now = new Date();
      const maxExpirationDate = new Date(now.getTime() + query.timeLeftToBid);
      queryConditions.expirationDate = { $lte: maxExpirationDate };
    }

    const projects = await Project.find(queryConditions)
      .skip(offset)
      .limit(limit);
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
