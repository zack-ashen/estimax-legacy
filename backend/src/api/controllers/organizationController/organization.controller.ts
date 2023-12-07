import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import OrganizationService from "../../../services/organization.service";

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

      res.status(200).json({ properties });
    } catch (e) {
      next(e);
    }
  }
}

export default OrganizationController;
