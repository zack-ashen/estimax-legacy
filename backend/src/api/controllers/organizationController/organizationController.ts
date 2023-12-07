import { NextFunction, Request, Response } from "express";

import mongoose from "mongoose";
import { IProperty } from "../../../models/property";
import OrganizationService from "../../../services/organizationService";

class OrganizationController {
  async getProperties(req: Request, res: Response, next: NextFunction) {
    try {
      const organizationId = req.params.id;
      if (!organizationId) {
        throw new Error("Organization was not provided");
      }

      if (!mongoose.Types.ObjectId.isValid(organizationId)) {
        throw new Error("Invalid organization ID");
      }

      const properties: IProperty[] = await OrganizationService.getProperties(
        organizationId
      );

      console.log(properties);

      // const response: GetPropertiesResponse = { properties };
      res.status(200).json({ properties: properties as IProperty[] });
    } catch (e) {
      next(e);
    }
  }
}

export default OrganizationController;
