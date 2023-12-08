import express from "express";
import ProjectController from "../controllers/project/project.controller";

const router = express.Router();

const projectController = new ProjectController();

/*
 * /: creates a project.
 */
router.post("/", projectController.create);

/*
 * /:id: gets a project.
 */
router.get("/:id", projectController.get);

export default router;
