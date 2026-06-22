import express from "express";
import { createMainCategory, deleteMainCategory, getMainCategory, updateMainCategory } from "../controllers/mainCategory.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/create", upload.single("pic"), createMainCategory);
router.get("/",getMainCategory);
router.patch("/:id", upload.single("pic"), updateMainCategory);
router.delete("/:id", deleteMainCategory);

export default router;