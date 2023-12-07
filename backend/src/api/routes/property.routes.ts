import express from "express";
import PropertyController from "../controllers/property/property.controller";

const router = express.Router();

const propertyController = new PropertyController();

/*
 * /: creates a property.
 */
router.post("/", propertyController.create);

/*
 * /: gets all properties.
 */
// router.get("/", propertyController.getAll);

/*
 * /:id: gets a property.
 */
router.get("/:id", propertyController.get);

export default router;
