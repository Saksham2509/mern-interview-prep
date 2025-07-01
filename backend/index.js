import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";

import connectDB from './db.js'; // <-- ✅ import here
import authRoutes from './routes/authRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import questionRoutes from './routes/questionRoutes.js';


dotenv.config();     // ✅ read .env file
connectDB();         // ✅ connect to MongoDB

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes); // ✅ Mount all auth routes
app.use('/api/sessions', sessionRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
