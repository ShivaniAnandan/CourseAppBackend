import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './database/config.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import purchaseRoutes from './routes/purchaseRoutes.js';

// Initialize dotenv
dotenv.config();
connectDB();  // Connect to MongoDB

const app = express();
const PORT = process.env.PORT;

// Middleware
// app.use(cors());
app.use(express.json());
app.use(cookieParser()); // Add cookie-parser middleware

app.use(cors({
  origin: ['http://localhost:5173', 'https://lighthearted-dieffenbachia-090958.netlify.app'],  // Your frontend's origin
  credentials: true,                // Allow credentials (cookies, authorization headers, etc.)
}));

app.get('/', (req, res) => {
  res.send('Welcome to the CourseApp API');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/purchase', purchaseRoutes);  // Register the purchase routes



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
