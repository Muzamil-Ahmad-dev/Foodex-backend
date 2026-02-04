// server.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.warn('⚠️ MongoDB URI not provided. Running without DB.');
    return;
  }
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: false
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('❌ MongoDB Connection Failed:', err.message);
    process.exit(1);
  }
};

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
};

startServer();