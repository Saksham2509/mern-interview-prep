import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js'; // <-- ✅ import here

dotenv.config();     // ✅ read .env file
connectDB();         // ✅ connect to MongoDB

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
