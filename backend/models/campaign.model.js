// models/campaign.model.js
import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  country: String,
  state: String,
  district: String,
  pincode: String
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: String,
  price: Number
}, { _id: false });

const mediaInfoSchema = new mongoose.Schema({
  type: String, // 'image' or 'video'
}, { _id: false });

const campaignAnalyticsSchema = new mongoose.Schema({
  influencer_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Influencer' 
  },
  views: Number,
  reach: Number,
  shares: Number,
  description: String,
  timestamp: { type: Date, default: Date.now }
}, { _id: false });

const campaignSchema = new mongoose.Schema({
  brand: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'BrandProfile', 
    required: true 
  },
  campaignName: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  budget: { 
    type: Number, 
    required: true 
  },
  minFollowers: { 
    type: Number, 
    required: true 
  },
  productDescription: { 
    type: String, 
    required: true 
  },
  ecommLink: String,
  isLocationSpecific: { 
    type: String, 
    enum: ['yes', 'no'], 
    default: 'no' 
  },
  location: locationSchema,
  media: [String], // Cloudinary URLs
  mediaInfo: [mediaInfoSchema],
  products: [productSchema],
  camp_type: Number,
  hashtags: String,
  status: { 
    type: String, 
    enum: ['active', 'completed'], 
    default: 'active'
  },
  matchedInfluencers: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'InfluencerProfile' 
  }],
  acceptedInfluencers: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'InfluencerProfile' 
  }],
  completedInfluencers: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'InfluencerProfile' 
  }],
  campaignAnalytics: [campaignAnalyticsSchema],
}, { timestamps: true });

const Campaign = mongoose.model('Campaign', campaignSchema);

export default Campaign;
