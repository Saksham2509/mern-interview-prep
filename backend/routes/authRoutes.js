import express from 'express';
import { loginUser, signupUser, getMe } from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js'; // ✅ import it

const router = express.Router();

router.post('/register', signupUser);
router.post('/login', loginUser);
router.get('/profile', protect, getMe); // 🔐 protect this route

export default router;

