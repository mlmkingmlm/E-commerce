import express from "express"
import upload from "../middleware/upload.js";
import { createBrand, deleteBrand, getBrand, updateBrand } from "../controllers/brand.controller.js";
const router = express.Router();


router.post("/create",upload.single("pic"), createBrand);
router.get("/",getBrand);
router.patch("/:id",upload.single("pic"),updateBrand);
router.delete("/:id", deleteBrand)

export default router;