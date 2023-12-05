import { NextFunction, Request, Response } from "express";
import LocationService from "../../../services/locationService";
import PropertyService from "../../../services/propertyService";
import { CreateRequest, CreateResponse } from "./types";

class PropertyController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { property } = req.body as CreateRequest;

      const location = await LocationService.getLocation(property.location);

      const newProperty = await PropertyService.create({
        ...property,
        location,
      });

      const result: CreateResponse = { property: newProperty.id };
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const property = await PropertyService.get(id);

      const response = { property };
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}

export default PropertyController;
