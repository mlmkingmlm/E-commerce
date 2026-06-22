import express from "express";
import { addToWishlist, getWishlist, removeWishlist } from "../controllers/wishlist.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, addToWishlist)
router.get("/", verifyToken, getWishlist);
router.delete("/:id", verifyToken, removeWishlist);

export default router