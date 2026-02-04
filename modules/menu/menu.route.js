import express from "express";
import {
  createMenu,
  getMenus,
  getMenuDetails,
} from "./menu.controller.js";
import { protect, adminOnly } from "../../middlewares/auth.js";

const router = express.Router();

/* Public */
router.get("/", getMenus);
router.get("/:slug", getMenuDetails);

/* Admin */
router.post("/", protect, adminOnly, createMenu);

export default router;