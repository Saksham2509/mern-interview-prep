import express from 'express';
import { loginUser, signupUser, getMe } from '../controllers/authController.js';

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', signupUser);

// POST /api/auth/login
router.post('/login', loginUser);

// GET /api/auth/me
router.get('/me', getMe);

export default router;
