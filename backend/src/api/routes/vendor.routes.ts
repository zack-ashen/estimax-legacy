import express from "express";
import VendorController from "../controllers/vendor/vendor.controller";

const router = express.Router();

const vendorController = new VendorController();

/*
 * /search searches for vendors based on the query.
 */
router.get("/search", vendorController.search);

export default router;
