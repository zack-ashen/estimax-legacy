import express from "express";
import mediaService from "../../services/media.service";
import ProjectController from "../controllers/project/project.controller";

const router = express.Router();

const projectController = new ProjectController();

/*
 * /: creates a project.
 */
router.post("/", mediaService.upload.array("media"), projectController.create);

/*
 * /search: gets projects.
 */
router.get("/search", projectController.search);

/*
 * /:id: gets a project.
 */
router.get("/:id", projectController.get);

export default router;
