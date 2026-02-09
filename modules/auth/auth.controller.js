 import User from '../../models/user.model.js';
import { generateToken } from './auth.utils.js';
import ApiError from '../../utils/ApiError.js';
import asyncHandler from '../../middlewares/asyncHandler.js';

/**
 * Register a new user/admin
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(400, 'Email already in use');

  const user = await User.create({ name, email, password, role });
  const token = generateToken(user);

  // Set JWT in cookie
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax', // ✅ localhost friendly
    secure: process.env.NODE_ENV === 'production', // ✅ only over HTTPS in production
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

/**
 * Login user/admin
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = generateToken(user);

  // Set JWT in cookie
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax', // ✅ localhost friendly
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.status(200).json({
    success: true,
    message: 'Login successful',
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});
