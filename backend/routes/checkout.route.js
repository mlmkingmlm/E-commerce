import express from "express";
import { cancelOrder, createOrder, getUserOrders } from "../controllers/checkout.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express();


router.post("/create", verifyToken, createOrder);
router.get("/", verifyToken, getUserOrders);
router.delete("/:id", verifyToken, cancelOrder)

export default router