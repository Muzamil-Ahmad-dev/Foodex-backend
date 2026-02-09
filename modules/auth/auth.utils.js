 import jwt from 'jsonwebtoken';
import ApiError from '../../utils/ApiError.js';

/**
 * Generate JWT token
 * @param {Object} user - Mongoose user document
 * @returns {string} JWT
 */
export const generateToken = (user) => {
  if (!process.env.JWT_SECRET)
    throw new ApiError(500, 'JWT_SECRET is not defined');

  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );
};

/**
 * Send JWT token as httpOnly cookie (works for localhost & production)
 * @param {Object} res - Express response object
 * @param {Object} user - Mongoose user document
 */
export const sendTokenResponse = (res, user) => {
  const token = generateToken(user);

  // Cookie options
  const cookieOptions = {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production', // HTTPS in production
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  };

  res.cookie('token', token, cookieOptions);

  return res.json({
    success: true,
    message: 'Authentication successful',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};
