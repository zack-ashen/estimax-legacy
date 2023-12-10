import express from "express";
import PropertyController from "../controllers/property/property.controller";

const router = express.Router();

const propertyController = new PropertyController();

/*
 * /: creates a property.
 */
router.post("/", propertyController.create);

/*
 * /:id/projects: gets a project.
 */
router.get("/:id/projects", propertyController.getProjects);

/*
 * /:id: gets a property.
 */
router.get("/:id", propertyController.get);

export default router;
