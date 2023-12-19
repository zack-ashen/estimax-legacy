import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import AuthService from "../../../services/auth.service";
import LocationService from "../../../services/location.service";
import mediaService from "../../../services/media.service";
import OrganizationService from "../../../services/organization.service";
import ProjectService from "../../../services/project.service";
import PropertyService from "../../../services/property.service";
import { PropertyDto } from "../../../types/dtos";
import { MulterS3File } from "./../../../services/media.service";
import { CreateResponse, GetProjectsResponse, GetResponse } from "./types";

class PropertyController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { organization } = AuthService.getTokenFromHeader(
        req.headers.authorization!
      );

      if (!organization) {
        throw new Error("Organization not found");
      }

      const property = req.body as PropertyDto;

      // Parse file keys from s3 bucket
      if (req.files) {
        property.media = mediaService.multerToMedias(
          req.files as MulterS3File[]
        );
      }

      if (!property.location) {
        throw new Error("Location not found");
      }

      const location = await LocationService.getLocation(property.location);

      let newProperty = await PropertyService.create({
        ...property,
        location,
      });

      const organizationId = new Types.ObjectId(organization);
      await OrganizationService.addProperty(organizationId, newProperty.id);

      const result: CreateResponse = { property: newProperty.id.toString() };
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const objId = new Types.ObjectId(id);
      const property = await PropertyService.get(objId);
      const propertyParsedMedia = await PropertyService.parseMedia(property);

      if (!property) {
        throw new Error("No property found.");
      }

      const response: GetResponse = { property: propertyParsedMedia };
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  async getProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const objId = new Types.ObjectId(id);
      const projects = await PropertyService.getProjects(objId);
      const parsedMediaProjects = await ProjectService.parseMedias(projects);

      if (!projects) {
        throw new Error("No property found.");
      }

      const response: GetProjectsResponse = { projects: parsedMediaProjects };
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}

export default PropertyController;
