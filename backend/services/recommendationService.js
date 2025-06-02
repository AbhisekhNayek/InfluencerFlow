import Influencer from '../models/influencer.model.js';
import Campaign from '../models/campaign.model.js';
import axios from 'axios';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';

// Configure Nodemailer transporter 
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const getRecommendedInfluencers = async (campaignId) => {
  try {
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) throw new Error('Campaign not found');

    // 1. Find influencers matching the campaign category
    const matchingInfluencers = await Influencer.find({ category: campaign.category });

    // 2. Format influencer data for API
    const formattedInfluencers = matchingInfluencers.map(inf => ({
      pincode: inf.pincode,
      access_token: inf.accessToken,
      id: inf._id.toString(),
    }));

    // 3. Call recommendation API
    const apiUrl = process.env.RECOMMENDATION_API_URL || 'https://micromatch-flask-server.onrender.com/server/recommend_influencers';

    const response = await axios.post(apiUrl, {
      campaigndata: {
        pincode: campaign.location?.pincode || '',
        camp_type: campaign.camp_type || 0,
      },
      influencers: formattedInfluencers,
    });

    // 4. Convert returned IDs to ObjectId
    const recommendedIds = response.data.influencers.map(id => mongoose.Types.ObjectId(id));
    return recommendedIds;

  } catch (error) {
    console.error('Error in getRecommendedInfluencers:', error);
    throw error;
  }
};

export const sendCampaignInvitation = async (influencerId, campaignId) => {
  try {
    const influencer = await Influencer.findById(influencerId);
    if (!influencer) throw new Error('Influencer not found');

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) throw new Error('Campaign not found');

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: influencer.gmail,
      subject: `New Campaign Opportunity: ${campaign.campaignName}`,
      html: `
        <h2>New Campaign Opportunity</h2>
        <p>Hello ${influencer.name},</p>
        <p>You have been selected for the "${campaign.campaignName}" campaign based on your profile matching their requirements.</p>
        <p><strong>Campaign Details:</strong></p>
        <ul>
          <li>Category: ${campaign.category}</li>
          <li>Product: ${campaign.productDescription}</li>
        </ul>
        <p>Login to your MicroMatch dashboard to view and accept this campaign.</p>
        <p>Best regards,<br>MicroMatch Team</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Add campaign to influencer's eligible campaigns
    await Influencer.findByIdAndUpdate(
      influencerId,
      { $push: { eligible_campaigns: campaignId } }
    );

    return true;

  } catch (error) {
    console.error('Error sending campaign invitation:', error);
    throw error;
  }
};

export const verifyInfluencer = async (influencerId) => {
  try {
    const influencer = await Influencer.findById(influencerId);
    if (!influencer) throw new Error('Influencer not found');

    const apiUrl = process.env.VERIFICATION_API_URL || 'https://micromatch-flask-server.onrender.com/server/is_fake_influencer';
    const response = await axios.post(apiUrl, { accessToken: influencer.accessToken });

    const isFake = response.data.is_fake;
    const description = response.data.description;

    await Influencer.findByIdAndUpdate(influencerId, {
      verified: !isFake,
      verfied_Status: description,
    });

    return !isFake;

  } catch (error) {
    console.error('Error verifying influencer:', error);
    throw error;
  }
};

export const validateCampaign = async (influencerId, campaignId) => {
  try {
    const influencer = await Influencer.findById(influencerId);
    const campaign = await Campaign.findById(campaignId);

    if (!influencer || !campaign) throw new Error('Influencer or Campaign not found');

    const apiUrl = process.env.VALIDATION_API_URL || 'https://micromatch-flask-server.onrender.com/server/is_valid_campaign';

    const response = await axios.post(apiUrl, {
      access_token: influencer.accessToken,
      media: {
        media_count: campaign.mediaInfo.length,
        media_list: campaign.mediaInfo,
      },
    });

    return {
      isValid: !response.data.error,
      description: response.data.description || "Campaign validation completed",
    };

  } catch (error) {
    console.error('Error validating campaign:', error);
    throw error;
  }
};

export const getCampaignAnalytics = async (influencerId) => {
  try {
    const influencer = await Influencer.findById(influencerId);
    if (!influencer) throw new Error('Influencer not found');

    const apiUrl = process.env.ANALYTICS_API_URL || 'https://micromatch-flask-server.onrender.com/server/get_campaign_analytics';

    const response = await axios.post(apiUrl, { access_token: influencer.accessToken });

    return response.data;

  } catch (error) {
    console.error('Error getting campaign analytics:', error);
    throw error;
  }
};
