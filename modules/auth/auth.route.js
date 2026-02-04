import express from 'express';
import asyncHandler from '../../middlewares/asyncHandler.js';
import validateRequest from '../../middlewares/validateRequest.js';
import { register, login } from './auth.controller.js';
import { protect, roleCheck } from './auth.middleware.js';
import { registerValidation, loginValidation } from './auth.validation.js';

const router = express.Router();

router.post('/register', registerValidation, validateRequest, asyncHandler(register));
router.post('/login', loginValidation, validateRequest, asyncHandler(login));

router.get('/user/profile', protect, asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
}));

router.get('/admin/dashboard', protect, roleCheck(['admin']), asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, message: 'Welcome to admin dashboard', admin: req.user });
}));

export default router;
