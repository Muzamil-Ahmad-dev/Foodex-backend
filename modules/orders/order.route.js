import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from './order.controller.js';
import {protect, adminOnly } from '../../middlewares/auth.js';

const router = express.Router();

// ---------------- PUBLIC ----------------
// Create order (logged-in users)
router.post('/', protect, createOrder);

// ---------------- ADMIN ----------------
// Get all orders
router.get('/',protect,adminOnly, getOrders);

// Get single order
router.get('/:id',protect,adminOnly, getOrderById);

// Update order status
router.put('/:id',protect,adminOnly, updateOrderStatus);

// Delete order
router.delete('/:id',protect, adminOnly, deleteOrder);

export default router;