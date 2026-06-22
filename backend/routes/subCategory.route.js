import express from "express";
import { createSubCategory, deleteSubCategory, getSubCategory, updateSubCategory } from "../controllers/subCategory.controller.js";
import upload from "../middleware/upload.js";
const router = express.Router();

router.post("/create", upload.single("pic"), createSubCategory)
router.get("/",getSubCategory)
router.delete("/:id", deleteSubCategory);
router.patch("/:id", upload.single("pic"), updateSubCategory);

export default router;