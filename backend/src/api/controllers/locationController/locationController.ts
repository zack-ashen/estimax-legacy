import { NextFunction, Request, Response } from "express";
import LocationService from "../../../services/locationService";
import { SearchQuery, SearchResponse } from "./types";

class LocationController {
  async search(req: Request, res: Response, next: NextFunction) {
    try {
      const { value, type, limit }: SearchQuery = {
        value: req.query.value as string,
        type: req.query.type as "cities" | "address",
        limit: +req.query.limit!,
      };

      const locations = await LocationService.search(limit, type, value); // +limit converts to number

      const result: SearchResponse = { locations };
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

export default LocationController;
