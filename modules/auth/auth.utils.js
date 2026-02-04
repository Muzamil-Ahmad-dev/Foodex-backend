import jwt from 'jsonwebtoken';
import ApiError from '../../utils/ApiError.js';

export const generateToken = (user) => {
  if (!process.env.JWT_SECRET) throw new ApiError(500, 'JWT_SECRET is not defined');
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
};
