import { NextFunction, Request, Response } from "express";
import VendorService from "../../../services/vendorService";
import { SearchQuery, SearchResponse } from "./types";

class VendorController {
  async search(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, phoneNumber, limit }: SearchQuery = {
        name: req.query.name as string,
        phoneNumber: req.query.phoneNumber as string,
        limit: +req.query.limit!,
      };

      const vendors = await VendorService.search(
        name as string,
        phoneNumber as string,
        +limit!
      );

      const vendorIds = vendors.map((vendor) => vendor.id);

      const result: SearchResponse = { vendors: vendorIds };
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

export default VendorController;
