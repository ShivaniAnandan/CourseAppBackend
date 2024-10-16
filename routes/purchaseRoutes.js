import express from 'express';
import { getMyCourses, getAllPurchasedCourses, buyCourses } from '../controllers/purchaseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to buy a course
router.post('/buy', protect, buyCourses);

// Route to get all courses a user has purchased
router.get('/my-courses', protect, getMyCourses);

// Route to get all purchased courses
router.get('/all-purchased', protect, getAllPurchasedCourses);

export default router;
