// server.js
import express from 'express';
import connectDB from './config/db.config.js';
import cors from 'cors';
import dotenv from 'dotenv';
import influencerRoutes from './routes/influencer.routes.js';
import authRoutes from './routes/auth.routes.js';
import brandRoutes from './routes/brand.routes.js';
import { cloudinary } from './config/cloudinary.config.js';

// Initialize environment variables
dotenv.config();

// Verify Cloudinary connection (add this block)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

// Routes
app.use('/api/influencers', influencerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/brands', brandRoutes);

// Cloudinary health check endpoint (optional)
app.get('/api/cloudinary-status', (req, res) => {
  cloudinary.api.ping()
    .then(() => res.json({ status: 'connected' }))
    .catch(() => res.status(500).json({ status: 'disconnected' }));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`Cloudinary configured: ${!!cloudinary.config().api_key}`);
});
