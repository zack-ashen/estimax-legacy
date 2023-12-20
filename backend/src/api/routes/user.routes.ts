import express from "express";
import UserController from "../controllers/user/user.controller";

const router = express.Router();

const userController = new UserController();

/*
 * /search searches for vendors based on the query.
 */
router.get("/:id", userController.get);

export default router;
