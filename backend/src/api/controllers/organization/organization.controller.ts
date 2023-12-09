import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import OrganizationService from "../../../services/organization.service";
import { GetPropertiesResponse } from "./types";

class OrganizationController {
  async getProperties(req: Request, res: Response, next: NextFunction) {
    try {
      const organizationId = req.params.id;

      // TODO: Move this stuff to middleware validation
      if (!organizationId) {
        throw new Error("Organization was not provided");
      }

      if (!Types.ObjectId.isValid(organizationId)) {
        throw new Error("Invalid organization ID");
      }

      const orgObjectId = new Types.ObjectId(organizationId);
      const properties = await OrganizationService.getProperties(orgObjectId);

      const response: GetPropertiesResponse = { properties };
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
  async getProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const organizationId = req.params.id;

      if (!organizationId) {
        throw new Error("Organization was not provided");
      }

      if (!Types.ObjectId.isValid(organizationId)) {
        throw new Error("Invalid organization ID");
      }

      const orgObjectId = new Types.ObjectId(organizationId);
      const projects = await OrganizationService.getProjects(orgObjectId);

      const response = { projects };
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}

export default OrganizationController;
