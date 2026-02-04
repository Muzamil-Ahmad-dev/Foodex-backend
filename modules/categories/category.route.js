import express from "express";
import { createCategory, getCategories, getCategoryBySlug } from "./category.controller.js";
import { protect, adminOnly } from "../../middlewares/auth.js";

const router = express.Router();

// Public
router.get("/", getCategories);
router.get("/:slug", getCategoryBySlug);

// Admin
router.post("/", protect, adminOnly, createCategory);

export default router;