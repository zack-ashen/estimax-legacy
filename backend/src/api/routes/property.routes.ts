import express from "express";
import mediaService from "../../services/media.service";
import PropertyController from "../controllers/property/property.controller";

const router = express.Router();

const propertyController = new PropertyController();

/*
 * /: creates a property.
 */
router.post("/", mediaService.upload.array("media"), propertyController.create);

/*
 * /:id/projects: gets all projects on this property
 */
router.get("/:id/projects", propertyController.getProjects);

/*
 * /:id: gets a property.
 */
router.get("/:id", propertyController.get);

export default router;
