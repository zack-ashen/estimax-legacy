import express from "express";
import LocationController from "../controllers/locationController/locationController";

const router = express.Router();

const locationController = new LocationController();

/*
 * /search searches for locations based on the query.
 */
router.post("/search", locationController.search);
