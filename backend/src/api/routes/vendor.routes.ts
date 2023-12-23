import express from "express";
import VendorController from "../controllers/vendor/vendor.controller";

const router = express.Router();

const vendorController = new VendorController();

/*
 * /search searches for vendors based on the query.
 */
router.get("/search", vendorController.search);

router.get("/:id/bids", vendorController.bids);

export default router;
