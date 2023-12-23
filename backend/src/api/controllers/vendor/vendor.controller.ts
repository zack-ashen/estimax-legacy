import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import VendorService from "../../../services/vendor.service";
import { SearchRequest, SearchResponse } from "./types";

class VendorController {
  async search(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        query,
        queryDetails: { page, limit },
      } = req.query as unknown as SearchRequest;

      const vendors = await VendorService.search(
        query ? query : {},
        page,
        limit
      );

      const result: SearchResponse = {
        vendors: vendors,
      };
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async bids(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const bids = await VendorService.bids(new Types.ObjectId(id));

      res.status(200).json({ bids });
    } catch (e) {
      next(e);
    }
  }
}

export default VendorController;
