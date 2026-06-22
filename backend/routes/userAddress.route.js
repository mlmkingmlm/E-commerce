import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createAddress, deleteAddress, getAddress, updateAddress } from "../controllers/userAddress.controller.js";
const router = express.Router();

router.post("/create", verifyToken, createAddress);
router.get("/", verifyToken, getAddress);
router.patch("/:id", updateAddress);
router.delete("/:id", deleteAddress)

export default router;