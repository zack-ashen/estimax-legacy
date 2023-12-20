import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import AuthService from "../../../services/auth.service";
import mediaService, { MulterS3File } from "../../../services/media.service";
import OrganizationService from "../../../services/organization.service";
import ProjectService from "../../../services/project.service";
import PropertyService from "../../../services/property.service";
import { ProjectDto } from "../../../types/dtos";
import { CreateResponse, GetResponse, SearchRequest } from "./types";

class ProjectController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { organization } = AuthService.getTokenFromHeader(
        req.headers.authorization!
      );

      if (!organization) {
        throw new Error("Organization not found");
      }

      const project = req.body as ProjectDto;

      // Parse file keys from s3 bucket
      if (req.files) {
        project.media = mediaService.multerToMedias(
          req.files as MulterS3File[]
        );
      }

      if (!project.expirationDate) {
        throw new Error("Expiration date not found");
      }

      let newProject = await ProjectService.create({
        ...project,
        property: {
          id: new Types.ObjectId(project.propertyId),
          name: project.propertyName,
        },
        expirationDate: new Date(project.expirationDate),
      });

      const organizationId = new Types.ObjectId(organization);
      await OrganizationService.addProject(organizationId, newProject.id);

      await PropertyService.addProject(newProject.id, newProject.property.id);

      const result: CreateResponse = { project: newProject.id.toString() };
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const objId = new Types.ObjectId(id);
      const project = await ProjectService.get(objId);
      const projectParsedMedia = await ProjectService.parseMedia(project);

      if (!project) {
        throw new Error("No project found.");
      }

      const response: GetResponse = { project: projectParsedMedia };
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  async search(req: Request, res: Response, next: NextFunction) {
    try {
      const { query, limit } = req.body as SearchRequest;
      const projects = await ProjectService.search(query, limit);
      const parsedProjects = await ProjectService.parseMedias(projects);

      const response = { projects: parsedProjects };
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}

export default ProjectController;
