// models/influencer.model.js
import mongoose from 'mongoose';

const InfluencerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gmail: { type: String, required: true },
    contactNo: { type: String, required: true },
    instaId: { type: String, required: true, unique: true },
    youtubeChannel: { type: String },
    pincode: { type: String },
    category: { type: String },
    accessToken: { type: String, required: true },
    instagramId: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verfied_Status: { type: String, default: "Verification will be started, we will update you when it is done" },
    eligible_campaigns: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Campaign' 
    }],
    accepted_campaigns: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Campaign' 
    }],
    applied_campaigns: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Campaign' 
    }],
    completed_campaigns: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Campaign' 
    }]
  },
  { timestamps: true }
);

const Influencer = mongoose.model('Influencer', InfluencerSchema);

export default Influencer;
