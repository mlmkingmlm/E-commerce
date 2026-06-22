import express from "express";
import { createFeature, deleteFeature, getFeature, updateFeature } from "../controllers/feature.controller.js";
const router = express.Router();

router.post("/create", createFeature);
router.get("/", getFeature)
router.patch("/:id", updateFeature);
router.delete("/:id", deleteFeature)

export default router;