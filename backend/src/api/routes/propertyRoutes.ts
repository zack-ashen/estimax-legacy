import express from "express";
import PropertyController from "../controllers/propertyController/propertyController";

const router = express.Router();

const propertyController = new PropertyController();

/*
 * /: creates a property.
 */
router.post("/", propertyController.create);

/*
 * /:id: gets a property.
 */
router.get("/:id", propertyController.get);

export default router;
