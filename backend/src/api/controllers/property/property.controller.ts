import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import AuthService from "../../../services/auth.service";
import LocationService from "../../../services/location.service";
import OrganizationService from "../../../services/organization.service";
import PropertyService from "../../../services/property.service";
import { CreateRequest, CreateResponse, GetResponse } from "./types";

class PropertyController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { organization } = AuthService.getTokenFromHeader(
        req.headers.authorization!
      );

      if (!organization) {
        throw new Error("Organization not found");
      }

      const { property } = req.body as CreateRequest;

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

      if (!property) {
        throw new Error("No property found.");
      }

      const response: GetResponse = { property };
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}

export default PropertyController;
