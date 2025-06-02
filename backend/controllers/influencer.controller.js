// influencer.controller.js
import dotenv from 'dotenv';
import axios from 'axios';
import Influencer from '../models/influencer.model.js';
import Campaign from '../models/campaign.model.js';
import {
  verifyInfluencer,
  validateCampaign,
  getCampaignAnalytics
} from '../services/recommendationService.js';

dotenv.config();

const INSTAGRAM_TOKEN_URL = process.env.INSTAGRAM_TOKEN_URL;

if (!INSTAGRAM_TOKEN_URL) {
  throw new Error('❌ INSTAGRAM_TOKEN_URL is missing from .env file.');
}

// Now you can use INSTAGRAM_TOKEN_URL in your logic

// Function to handle Instagram verification (Get Access Token and Instagram ID)
export const verifyInstagram = async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ success: false, message: 'Instagram code is missing' });
  }

  try {
    const response = await axios.get(`${INSTAGRAM_TOKEN_URL}?code=${code}`);
    const access_token = response.data.access_token
    const insta_scoped_id = response.data.insta_scoped_id
    
    if (!access_token || !insta_scoped_id) {
      return res.status(400).json({ success:false ,message: 'Instagram verification failed'});
    }
    return res.json({ success: true, access_token, insta_scoped_id });
  } catch (error) {
    console.error('Error verifying Instagram:', error);
    return res.status(500).json({ success: false, message: 'Instagram verification error', error: error.message });
  }
};

// Register a new influencer
export const registerInfluencer = async (req, res) => {
  const { name, gmail, contactNo, instaId, youtubeChannel, pincode, category, access_token, insta_scoped_id } = req.body;

  if (!access_token || !insta_scoped_id) {
    return res.status(400).json({ success: false, message: 'Instagram authentication required' });
  }

  try {
    // Check if influencer already exists
    const existingInfluencer = await Influencer.findOne({ instaId });
    if (existingInfluencer) {
      return res.status(400).json({ success: false, message: 'Influencer with this Instagram ID already exists' });
    }

    const newInfluencer = new Influencer({
      name,
      gmail,
      contactNo,
      instaId,
      youtubeChannel,
      pincode,
      category,
      access_token,
      insta_scoped_id
    });

    await newInfluencer.save();
    return res.status(201).json({ success: true, message: 'Influencer registered successfully' });
  } catch (error) {
    console.error('Error registering influencer:', error);
    return res.status(500).json({ success: false, message: 'Error registering influencer', error: error.message });
  }
};

// Get influencer profile details
export const getInfluencerProfile = async (req, res) => {
  try {
    const influencer = await Influencer.findById(req.params.id);
    if (!influencer) {
      return res.status(404).json({ success: false, message: 'Influencer not found' });
    }
    return res.json({ success: true, influencer });
  } catch (error) {
    console.error('Error retrieving influencer profile:', error);
    return res.status(500).json({ success: false, message: 'Error retrieving influencer profile', error: error.message });
  }
};

// Update influencer profile details
export const updateInfluencerProfile = async (req, res) => {
  const { name, gmail, contactNo, youtubeChannel, pincode, category } = req.body;

  try {
    const influencer = await Influencer.findById(req.params.id);
    if (!influencer) {
      return res.status(404).json({ success: false, message: 'Influencer not found' });
    }

    influencer.name = name || influencer.name;
    influencer.gmail = gmail || influencer.gmail;
    influencer.contactNo = contactNo || influencer.contactNo;
    influencer.youtubeChannel = youtubeChannel || influencer.youtubeChannel;
    influencer.pincode = pincode || influencer.pincode;
    influencer.category = category || influencer.category;

    await influencer.save();

    return res.json({ success: true, message: 'Influencer profile updated successfully' });
  } catch (error) {
    console.error('Error updating influencer profile:', error);
    return res.status(500).json({ success: false, message: 'Error updating influencer profile', error: error.message });
  }
};

// Verify influencer
export const verifyInfluencerProfile = async (req, res) => {
  try {
    const influencerId = req.params.id;
    const isVerified = await verifyInfluencer(influencerId);
    
    res.json({ 
      success: true, 
      isVerified,
      message: isVerified ? 'Influencer verified successfully' : 'Influencer verification failed'
    });
  } catch (error) {
    console.error('Error verifying influencer:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error verifying influencer',
      error: error.message 
    });
  }
};

// Get eligible campaigns for influencer
export const getEligibleCampaigns = async (req, res) => {
  try {
    const influencerId = req.params.id;
    const influencer = await Influencer.findById(influencerId)
      .populate({
        path: 'eligible_campaigns',
        select: 'campaignName category budget productDescription media'
      });
    
    if (!influencer) {
      return res.status(404).json({ 
        success: false, 
        message: 'Influencer not found' 
      });
    }
    
    // Sort campaigns so the most recent ones appear first
    const sortedCampaigns = [...influencer.eligible_campaigns].reverse();
    
    res.json({ 
      success: true, 
      campaigns: sortedCampaigns
    });
  } catch (error) {
    console.error('Error getting eligible campaigns:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error getting eligible campaigns',
      error: error.message 
    });
  }
};

// Accept campaign
export const acceptCampaign = async (req, res) => {
  try {
    const { influencerId, campaignId } = req.params;
    
    // Check if campaign is in eligible_campaigns
    const influencer = await Influencer.findById(influencerId);
    if (!influencer) {
      return res.status(404).json({ 
        success: false, 
        message: 'Influencer not found' 
      });
    }
    
    if (!influencer.eligible_campaigns.includes(campaignId)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Campaign not found in eligible campaigns' 
      });
    }
    
    // Move campaign from eligible_campaigns to accepted_campaigns
    await Influencer.findByIdAndUpdate(
      influencerId,
      {
        $pull: { eligible_campaigns: campaignId },
        $push: { accepted_campaigns: campaignId }
      }
    );
    
    // Update campaign's acceptedInfluencers
    await Campaign.findByIdAndUpdate(
      campaignId,
      { $push: { acceptedInfluencers: influencerId } }
    );
    
    res.json({ 
      success: true, 
      message: 'Campaign accepted successfully'
    });
  } catch (error) {
    console.error('Error accepting campaign:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error accepting campaign',
      error: error.message 
    });
  }
};

// Submit campaign story
export const submitCampaignStory = async (req, res) => {
  try {
    const { influencerId, campaignId } = req.params;
    const { storyUrl } = req.body;
    
    if (!storyUrl) {
      return res.status(400).json({ 
        success: false, 
        message: 'Story URL is required' 
      });
    }
    
    // Check if campaign is in accepted_campaigns
    const influencer = await Influencer.findById(influencerId);
    if (!influencer) {
      return res.status(404).json({ 
        success: false, 
        message: 'Influencer not found' 
      });
    }
    
    if (!influencer.accepted_campaigns.includes(campaignId)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Campaign not found in accepted campaigns' 
      });
    }
    
    // Move campaign from accepted_campaigns to applied_campaigns
    await Influencer.findByIdAndUpdate(
      influencerId,
      {
        $pull: { accepted_campaigns: campaignId },
        $push: { applied_campaigns: campaignId }
      }
    );
    
    // Store the story URL with the campaign
    await Campaign.findByIdAndUpdate(
      campaignId,
      { 
        $push: { 
          campaignAnalytics: { 
            influencer_id: influencerId, 
            postUrl: storyUrl 
          } 
        } 
      }
    );
    
    res.json({ 
      success: true, 
      message: 'Campaign story submitted successfully'
    });
    
    // Schedule validation after 23 hours
    setTimeout(async () => {
      try {
        await validateInfluencerCampaign(influencerId, campaignId);
      } catch (err) {
        console.error('Error in scheduled campaign validation:', err);
      }
    }, 23 * 60 * 60 * 1000); // 23 hours
    
  } catch (error) {
    console.error('Error submitting campaign story:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error submitting campaign story',
      error: error.message 
    });
  }
};

// Helper function for campaign validation
const validateInfluencerCampaign = async (influencerId, campaignId) => {
  try {
    // Validate the campaign
    const validation = await validateCampaign(influencerId, campaignId);
    
    if (validation.isValid) {
      // Move campaign from applied_campaigns to completed_campaigns
      await Influencer.findByIdAndUpdate(
        influencerId,
        {
          $pull: { applied_campaigns: campaignId },
          $push: { completed_campaigns: campaignId }
        }
      );
      
      // Update campaign's completedInfluencers
      await Campaign.findByIdAndUpdate(
        campaignId,
        { $push: { completedInfluencers: influencerId } }
      );
      
      // Get and store campaign analytics
      const analytics = await getCampaignAnalytics(influencerId);
      
      if(analytics.views == -1 || analytics.reach == -1 || analytics.shared == -1) {
        await Campaign.findOneAndUpdate(
          { 
            _id: campaignId, 
            'campaignAnalytics.influencer_id': influencerId 
          },
          { 
            $set: { 
              'campaignAnalytics.$.views': 0,
              'campaignAnalytics.$.reach': 0, 
              'campaignAnalytics.$.shares': 0,
              'campaignAnalytics.$.description': "analytics not fetched successfully"
            } 
          }
        );
        return validation.isValid;
      }
      await Campaign.findOneAndUpdate(
        { 
          _id: campaignId, 
          'campaignAnalytics.influencer_id': influencerId 
        },
        { 
          $set: { 
            'campaignAnalytics.$.views': analytics.views,
            'campaignAnalytics.$.reach': analytics.reach, 
            'campaignAnalytics.$.shares': analytics.shared,
            'campaignAnalytics.$.description': "analytics fetched successfully"
          } 
        }
      );
    }
    return validation.isValid;
  } catch (error) {
    console.error('Error validating influencer campaign:', error);
    throw error;
  }
};

// Manually validate a campaign (for testing)
export const validateCampaignManually = async (req, res) => {
  try {
    const { influencerId, campaignId } = req.params;
    
    const isValid = await validateInfluencerCampaign(influencerId, campaignId);
    
    res.json({ 
      success: true, 
      isValid,
      message: isValid ? 'Campaign validated successfully' : 'Campaign validation failed'
    });
  } catch (error) {
    console.error('Error validating campaign manually:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error validating campaign',
      error: error.message 
    });
  }
};