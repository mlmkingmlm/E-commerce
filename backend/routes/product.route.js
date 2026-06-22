import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/create", upload.array("pics", 5), createProduct);
router.get("/", getProducts);
router.delete("/:id", deleteProduct);
router.patch("/:id",upload.array("pics",5),updateProduct)
export default router;