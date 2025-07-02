import express from 'express';
import {
  createSession,
  getMySessions,
  getSessionById,
  deleteSession,
} from '../controllers/sessionController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createSession);           // Create a session
router.get('/my-sessions', protect, getMySessions);       // Get all sessions for current user
router.get('/:id', protect, getSessionById);              // Get session by ID
router.delete('/:id', protect, deleteSession);            // Delete session

export default router;
