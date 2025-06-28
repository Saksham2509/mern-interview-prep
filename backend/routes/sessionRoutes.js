import express from 'express';
import { createSession } from '../controllers/sessionController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// 🔐 Create new session
router.post('/', protect, createSession);

export default router;
