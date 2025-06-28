import express from 'express';
import { addQuestion, togglePinQuestion } from '../controllers/questionController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:sessionId', protect, addQuestion);
router.patch('/pin/:id', protect, togglePinQuestion);

export default router;
