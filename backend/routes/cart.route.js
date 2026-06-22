import express from "express";
import {verifyToken} from "../middleware/verifyToken.js"
import { addToCart, deleteCart, getCart, updateCart } from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/create", verifyToken, addToCart);
router.get("/", verifyToken, getCart);
router.patch("/:id", updateCart)
router.delete("/:id", verifyToken, deleteCart)

export default router