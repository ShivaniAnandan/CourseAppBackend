import express from 'express';
import { signup, login , forgetPassword, resetPassword, getUsers, deleteUser} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forget-password', forgetPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/', protect, getUsers);
router.delete('/:id', protect, deleteUser);

export default router;
