import User from '../../models/user.model.js';
import { generateToken } from './auth.utils.js';
import ApiError from '../../utils/ApiError.js';
import asyncHandler from '../../middlewares/asyncHandler.js';

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(400, 'Email already in use');

  const user = await User.create({ name, email, password });
  const token = generateToken(user);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = generateToken(user);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
});
