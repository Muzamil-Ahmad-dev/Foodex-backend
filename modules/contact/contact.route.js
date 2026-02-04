import express from "express";
import * as ContactController from "./contact.controller.js";

const router = express.Router();

// User submits a contact query
router.post("/", ContactController.submitContact);

// Admin gets all queries
router.get("/", ContactController.getContacts);

// Get a single query
router.get("/:id", ContactController.getContact);

// Admin responds & updates status
router.put("/:id/respond", ContactController.respondContact);

// Delete a query
router.delete("/:id", ContactController.deleteContact);

export default router;