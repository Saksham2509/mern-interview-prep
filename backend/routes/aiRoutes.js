import express from "express";
import  protect  from "../middleware/authMiddleware.js";
import {
  generateInterviewQuestions,
  generateConceptExplanation,
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate-questions", protect, generateInterviewQuestions);
router.post("/generate-explanation", protect, generateConceptExplanation);

export default router;
