// app.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';

// Import individual routes
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import publicRoutes from './routes/publicRoutes.js';

const router = express.Router();

// Middlewares
router.use(helmet());
router.use(cors());
router.use(bodyParser.json({ limit: '10mb' }));
router.use(bodyParser.urlencoded({ extended: true }));

// Sub Routes
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes); 
router.use('/public', publicRoutes); 
  
// Health route
router.get('/', (req, res) => {
  res.json({ success: true, message: "API v1 running 🚀" });
});

// 404 fallback
router.use('*', (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default router;
