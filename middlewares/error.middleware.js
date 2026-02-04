import ApiError from '../utils/ApiError.js';

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Server Error';
  res.status(statusCode).json({ success: false, message });
};

export default errorHandler;
