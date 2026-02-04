import jwt from 'jsonwebtoken';
import asyncHandler from '../../middlewares/asyncHandler.js';
import ApiError from '../../utils/ApiError.js';
import User from '../../models/user.model.js';

export const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    throw new ApiError(401, 'Authorization token missing');

  const token = authHeader.split(' ')[1];
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw new ApiError(401, 'Token invalid or expired');
  }

  const user = await User.findById(decoded.id);
  if (!user) throw new ApiError(401, 'User no longer exists');

  req.user = user;
  next();
});

export const roleCheck = (roles = []) => (req, res, next) => {
  if (!req.user) throw new ApiError(401, 'Not authenticated');
  if (!roles.includes(req.user.role)) throw new ApiError(403, 'Access denied');
  next();
};
