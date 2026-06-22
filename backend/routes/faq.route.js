import express from "express"
import upload from "../middleware/upload.js";
import { createFaq, deleteFaq, getFaq, updateFaq } from "../controllers/faq.controller.js";
const router = express.Router();


router.post("/create", createFaq);
router.get("/",getFaq);
router.patch("/:id", updateFaq);
router.delete("/:id", deleteFaq)

export default router;