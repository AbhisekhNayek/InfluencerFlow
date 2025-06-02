// models/brand.model.js
import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  businessName: { type: String, required: true },
  legalEntityName: { type: String, required: true },
  businessType: { type: String, required: true },
  category: { type: String, required: true },
  email: { type: String, required: true },
  phoneNo: { type: String, required: true },
  address: { type: String, required: true },
  website: { type: String },
  description: { type: String },
  brand_logo: { type: String }, // single image URL (Cloudinary)
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  uploaded_campaigns: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign'
  }],
  closed_campaigns: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign'
  }],
  analytics: [{
    campaignid: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' },
    views: Number,
    reach: Number,
    shares: Number
  }]
}, { timestamps: true });

const Brand = mongoose.model('Brand', brandSchema);
export default Brand;
