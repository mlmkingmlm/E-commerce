import express from "express"
import { getAllUsers, login, signup } from "../controllers/authentication.controller.js";
const router = express.Router();



router.post("/create", signup);
router.post("/login", login)
router.get("/", getAllUsers);

export default router;