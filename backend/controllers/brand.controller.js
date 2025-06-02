// brand.controller.js
import Brand from "../models/brand.model.js";
import User from "../models/user.model.js";
import Campaign from "../models/campaign.model.js";
import {
  getRecommendedInfluencers,
  sendCampaignInvitation,
} from "../services/recommendationService.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//Register Brand
export const register = async (req, res) => {
  try {
    const {
      businessName,
      legalEntityName,
      businessType,
      category,
      email,
      phoneNo,
      address,
      websiteOrSocialMedia,
      description,
    } = req.body;

    const brandLogo = req.file?.path || null;

    const newBrand = new Brand({
      user: req.user.id,
      businessName,
      legalEntityName,
      businessType,
      category,
      email,
      phoneNo,
      address,
      website: websiteOrSocialMedia,
      description,
      brand_logo: brandLogo,
      status: "pending",
    });

    await newBrand.save();
    await User.findByIdAndUpdate(newBrand.user, { role: "brand" });
    res.status(201).json({ success: true, brand: newBrand });
  } catch (error) {
    console.error("Error registering brand:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//Get Pending Brands
export const getPendingBrands = async (req, res) => {
  try {
    const pendingBrands = await Brand.find({ status: "pending" }).populate(
      "user",
      "name email"
    );
    res.json(pendingBrands);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching pending brands", error: err.message });
  }
};

//Get Brand Profile
export const getBrandProfile = async (req, res) => {
  try {
    const brand = await Brand.findOne({ user: req.user.id });
    if (!brand)
      return res.status(404).json({ message: "Brand profile not found" });
    const data = {
      logo: brand.brand_logo,
      businessName: brand.businessName,
      website: brand.website,
      industry: brand.category,
      description: brand.description,
      email: brand.email,
    };
    res.json(data);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching brand profile", error: err.message });
  }
};

//Update Brand Profile
export const updateBrandProfile = async (req, res) => {
  try {
    const brand = await Brand.findOne({ user: req.user.id });
    if (!brand)
      return res.status(404).json({ message: "Brand profile not found" });
    const brandLogo = req.file?.path || null;
    const { businessName, website, industry, description, email } = req.body;

    brand.brand_logo = brandLogo || brand.brand_logo; // Use existing logo if not updated
    brand.businessName = businessName;
    brand.website = website;
    brand.category = industry;
    brand.description = description;
    brand.email = email;

    await brand.save();

    res
      .status(200)
      .json({ success: true, message: "Profile updated successfully" });
  } catch (err) {
    console.error("Error updating brand profile:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//Approved Brand
export const approveBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ message: "Brand not found" });
    brand.status = "approved";
    await brand.save();
    res.json({ message: "Brand approved and role updated" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error approving brand", error: err.message });
  }
};

//Reject Brand
export const rejectBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ message: "Brand not found" });

    await brand.remove();
    res.json({ message: "Brand rejected and deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error rejecting brand", error: err.message });
  }
};

//Create Campaign
export const createCampaign = async (req, res) => {
  try {
    console.log("Create Campaign request body:", req.body);
    console.log("Files received:", req.files);

    const {
      campaignName,
      category,
      budget,
      minFollowers,
      productDescription,
      ecommLink,
      isLocationSpecific,
      location,
      products,
      hashtags,
      mediaInfo,
    } = req.body;

    // Validate required fields
    if (
      !campaignName ||
      !category ||
      !budget ||
      !minFollowers ||
      !productDescription
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check brand approval status
    const brand = await Brand.findOne({ user: req.user.id });
    if (!brand)
      return res.status(404).json({ message: "Brand profile not found" });
    if (brand.status !== "approved")
      return res.status(403).json({ message: "Brand not approved" });

    // Validate media files
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one media file is required" });
    }

    // Parse JSON data that came as strings
    let parsedLocation =
      isLocationSpecific === "yes" ? JSON.parse(location) : null;
    let parsedProducts = products ? JSON.parse(products) : [];
    let parsedMediaInfo = mediaInfo ? JSON.parse(mediaInfo) : [];

    // Create campaign
    const campaign = new Campaign({
      brand: brand._id,
      campaignName,
      category,
      budget: parseFloat(budget),
      minFollowers: parseInt(minFollowers),
      productDescription,
      ecommLink,
      isLocationSpecific,
      location: parsedLocation,
      media: req.files.map((file) => file.path),
      mediaInfo: parsedMediaInfo,
      products: parsedProducts,
      hashtags,
      status: "active",
    });

    console.log("Campaign to be saved:", campaign);

    await campaign.save();
    brand.uploaded_campaigns.push(campaign._id);
    // NEW CODE: Automatically find recommended influencers
    try {
      console.log(
        "Finding recommended influencers for campaign:",
        campaign._id
      );
      const influencers = await getRecommendedInfluencers(campaign._id);

      // Update campaign with matched influencers
      campaign.matchedInflxuencers = influencers;
      await campaign.save();

      console.log(`Found ${influencers.length} matched influencers`);

      // Optionally, you can also automatically send invitations here
      // Uncomment the following block if you want automatic invitations
      console.log("Sending invitations to matched influencers");
      const results = [];
      for (const influencerId of influencers) {
        try {
          await sendCampaignInvitation(influencerId, campaign._id);
          results.push({ influencerId, status: "success" });
        } catch (err) {
          results.push({ influencerId, status: "failed", error: err.message });
        }
        // Wait 15 seconds before sending the next email
        await delay(15000);
      }
      console.log("Invitation results:", results);
    } catch (error) {
      console.error("Error finding recommended influencers:", error);
      // Don't stop the response, just log the error
    }

    res.status(201).json({
      success: true,
      message: "Campaign created successfully",
      campaign,
    });
  } catch (error) {
    console.error("DETAILED ERROR in createCampaign:", error);
    console.error("Error stack trace:", error.stack);
    res.status(500).json({
      success: false,
      message: "Error creating campaign",
      error: error.message,
    });
  }
};

//Find Influencers
export const findRecommendedInfluencers = async (req, res) => {
  try {
    const campaignId = req.params.campaignId;

    // Get recommended influencers
    const influencers = await getRecommendedInfluencers(campaignId);

    // Update campaign with matched influencers
    await Campaign.findByIdAndUpdate(campaignId, {
      matchedInfluencers: influencers,
    });

    res.json({
      success: true,
      message: "Recommended influencers found",
      count: influencers.length,
      influencers,
    });
  } catch (error) {
    console.error("Error finding recommended influencers:", error);
    res.status(500).json({
      success: false,
      message: "Error finding recommended influencers",
      error: error.message,
    });
  }
};

// Send invitation emails to matched influencers
export const sendCampaignInvitations = async (req, res) => {
  try {
    const campaignId = req.params.campaignId;
    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }

    if (campaign.matchedInfluencers.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No matched influencers for this campaign'
      });
    }

    // Send invitations with delay between each
    const results = [];
    for (const influencerId of campaign.matchedInfluencers) {
      try {
        await sendCampaignInvitation(influencerId, campaignId);
        results.push({ influencerId, status: 'success' });
      } catch (err) {
        results.push({ influencerId, status: 'failed', error: err.message });
      }

      // Wait 15 seconds before sending the next email
      await delay(15000);
    }

    res.json({
      success: true,
      message: 'Campaign invitations sent',
      results
    });
  } catch (error) {
    console.error('Error sending campaign invitations:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending campaign invitations',
      error: error.message
    });
  }
};

// Get campaign analytics
export const getCampaignAnalytics = async (req, res) => {
  try {
    const campaignId = req.params.campaignId;
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }
    const completedInfluencers = campaign.campaignAnalyticsSchema.length;
    const views = 0,
      reach = 0,
      shares = 0;
    for (const camapana of campaign.campaignAnalyticsSchema) {
      views += camapana.views;
      reach += camapana.reach;
      shares += camapana.shares;
    }
    res.json({
      success: true,
      campaign: {
        completedInfluencers,
        views,
        reach,
        shares,
      },
    });
  } catch (error) {
    console.error("Error getting campaign analytics:", error);
    res.status(500).json({
      success: false,
      message: "Error getting campaign analytics",
      error: error.message,
    });
  }
};
