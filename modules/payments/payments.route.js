// backend/modules/payments/payments.route.js

import express from "express";
import { codPayment, stripePayment } from "./payments.controller.js";

const router = express.Router();

// COD
router.post("/cod", codPayment);

// Stripe placeholder
router.post("/stripe", stripePayment);

export default router;