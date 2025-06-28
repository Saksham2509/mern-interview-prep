import express from 'express';
import {
  createSession,
  getAllSessions,
  getSessionById,
  deleteSession
} from '../controllers/sessionController.js';

import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createSession);         // Create
router.get('/', protect, getAllSessions);         // Get all
router.get('/:id', protect, getSessionById);      // Get one
router.delete('/:id', protect, deleteSession);    // Delete one

export default router;
