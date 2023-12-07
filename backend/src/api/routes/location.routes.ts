import express from "express";
import LocationController from "../controllers/location/location.controller";

const router = express.Router();

const locationController = new LocationController();

/*
 * /search searches for locations based on the query.
 */
router.get("/search", locationController.search);

export default router;
