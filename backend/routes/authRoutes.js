import express from 'express';
import { loginUser, signupUser, getMe } from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js'; // ✅ import it

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe); // 🔐 protect this route

export default router;

