 // app.js
import express from 'express';  
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';

import authRoutes from './modules/auth/auth.route.js';
import menuRoutes from './modules/menu/index.js';
import categoryRoutes from './modules/categories/index.js';
import contactModule from './modules/contact/index.js';
import paymentsModule from "./modules/payments/index.js";
import orderRoutes from './modules/orders/order.route.js';

import errorHandler from './middlewares/error.middleware.js';
import ApiError from './utils/ApiError.js';

// Load environment variables
dotenv.config();

const app = express();

// ------------------- MIDDLEWARES -------------------

// Security headers
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));

// Logging
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

// Body parser
app.use(express.json({ limit: '10kb' }));

// ------------------- HEALTH CHECK -------------------
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// ------------------- ROUTES -------------------
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);         // Public + admin endpoints
app.use('/api/categories', categoryRoutes);
contactModule(app);                        // Contact/support module
// Register payments module
paymentsModule(app);
app.use('/api/orders', orderRoutes);

// ------------------- 404 HANDLER -------------------
app.use((req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
});

// ------------------- GLOBAL ERROR HANDLER -------------------
app.use(errorHandler);

export default app;