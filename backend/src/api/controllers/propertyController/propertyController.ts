import { NextFunction, Request, Response } from "express";
import AuthService from "../../../services/authService";
import LocationService from "../../../services/locationService";
import OrganizationService from "../../../services/organizationService";
import PropertyService from "../../../services/propertyService";
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

      await OrganizationService.addProperty(
        organization,
        newProperty.id.toString()
      );

      const result: CreateResponse = { property: newProperty.id.toString() };
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const property = await PropertyService.get(id);

      if (!property) {
        throw new Error("No property found.");
      }

      console.log(property);
      const response: GetResponse = { property };
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}

export default PropertyController;
