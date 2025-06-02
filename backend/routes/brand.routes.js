// routes/brand.routes.js
import express from 'express';

import {
  register,
  getBrandProfile,
  getPendingBrands,
  updateBrandProfile,
  approveBrand,
  rejectBrand,
  createCampaign,
  findRecommendedInfluencers,
  getCampaignAnalytics
} from '../controllers/brand.controller.js';

import { upload } from '../config/cloudinary.config.js';
import protect from '../middleware/auth.middleware.js';
import adminOnly from '../middleware/admin.middleware.js';
import brandOnly from '../middleware/brand.middleware.js';

const router = express.Router();

// brand submits profile with logo upload
router.post('/register', protect, upload.single('brand_logo'), register);

// fix route path (missing slash at start)
router.post('/update', protect, brandOnly, upload.single('brand_logo'), updateBrandProfile);

// admin routes
router.get('/pending', protect, adminOnly, getPendingBrands);
router.put('/approve/:id', protect, adminOnly, approveBrand);
router.delete('/reject/:id', protect, adminOnly, rejectBrand);

// brand routes
router.get('/getprofile', protect, brandOnly, getBrandProfile);
router.post('/launchCampaign', protect, brandOnly, upload.array('media', 5), createCampaign);

router.get('/campaigns/:campaignId/recommend', protect, brandOnly, findRecommendedInfluencers);
// router.post('/campaigns/:campaignId/invite', protect, brandOnly, sendCampaignInvitations); // commented out as before
router.get('/campaigns/:campaignId/analytics', protect, brandOnly, getCampaignAnalytics);

export default router;
