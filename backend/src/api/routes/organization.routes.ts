import express from "express";
import OrganizationController from "../controllers/organization/organization.controller";

const router = express.Router();

const organizationController = new OrganizationController();

/*
 * GET: /:id/properties -> gets all properties for an organization.
 */
router.get("/:id/properties", organizationController.getProperties);

/*
 * GET: /:id/projects -> gets all projects for an organization.
 */
router.get("/:id/projects", organizationController.getProjects);

/*
 * GET: /:id/vendors -> gets all users for an organization.
 */
router.get("/:id/vendors", organizationController.getVendors);

export default router;
