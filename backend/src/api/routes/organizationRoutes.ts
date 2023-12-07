import express from "express";
import OrganizationController from "../controllers/organizationController/organizationController";

const router = express.Router();

const organizationController = new OrganizationController();

/*
 * GET: /:id/properties -> gets all properties for an organization.
 */
router.get("/:id/properties", organizationController.getProperties);

export default router;
