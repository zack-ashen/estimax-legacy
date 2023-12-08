import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import AuthService from "../../../services/auth.service";
import OrganizationService from "../../../services/organization.service";
import ProjectService from "../../../services/project.service";
import { CreateRequest, CreateResponse, GetResponse } from "./types";

class ProjectController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { organization } = AuthService.getTokenFromHeader(
        req.headers.authorization!
      );

      if (!organization) {
        throw new Error("Organization not found");
      }

      const { project } = req.body as CreateRequest;

      let newProject = await ProjectService.create(project);

      const organizationId = new Types.ObjectId(organization);
      await OrganizationService.addProject(organizationId, newProject.id);

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

      if (!project) {
        throw new Error("No project found.");
      }

      const response: GetResponse = { project };
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}

export default ProjectController;