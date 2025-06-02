import React, { useState, useEffect } from 'react';
import { Search, Filter, Sliders, MapPin, Calendar, Tag, Briefcase, Instagram, TrendingUp, Users, ChevronDown, Star } from 'lucide-react';

const CampaignsBrowsePage = () => {
  // Sample campaigns data - would come from API in real application
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      title: "Summer Collection Launch",
      brand: "FashionNova",
      category: "Fashion",
      platform: "Instagram",
      compensation: "$2,000", 
      deadline: "May 15, 2025",
      location: "Remote",
      requirements: "Min 15K followers",
      description: "Looking for fashion influencers to promote our new summer collection with creative posts and stories.",
      logo: "/api/placeholder/60/60",
      brandVerified: true,
      applicants: 43
    },
    {
      id: 2,
      title: "Healthy Lifestyle Product Review",
      brand: "VitaBoost",
      category: "Health & Wellness",
      platform: "Instagram, TikTok",
      compensation: "$1,500 + Products",
      deadline: "May 20, 2025",
      location: "Remote",
      requirements: "Min 10K followers, fitness niche",
      description: "Seeking fitness and wellness influencers to review our new vitamin supplement line through authentic content.",
      logo: "/api/placeholder/60/60",
      brandVerified: true,
      applicants: 27
    },
    {
      id: 3,
      title: "Gaming Headset Launch",
      brand: "TechGear",
      category: "Gaming",
      platform: "YouTube, Twitch",
      compensation: "$3,000 + Products",
      deadline: "May 25, 2025",
      location: "Remote",
      requirements: "Min 20K subscribers, gaming content",
      description: "Partnering with gaming content creators to showcase our new premium headset during gameplay streams.",
      logo: "/api/placeholder/60/60",
      brandVerified: true,
      applicants: 61
    },
    {
      id: 4,
      title: "Beauty Product Tutorial",
      brand: "GlowCosmetics",
      category: "Beauty",
      platform: "Instagram, YouTube",
      compensation: "$1,800 + PR Package",
      deadline: "May 18, 2025",
      location: "Remote",
      requirements: "Min 8K followers, beauty niche",
      description: "Looking for beauty influencers to create makeup tutorials featuring our new summer line.",
      logo: "/api/placeholder/60/60",
      brandVerified: false,
      applicants: 52
    },
    {
      id: 5,
      title: "Travel Content Series",
      brand: "WanderLux Hotels",
      category: "Travel",
      platform: "Instagram, TikTok",
      compensation: "Free Stay + $2,500",
      deadline: "June 5, 2025",
      location: "Miami, FL",
      requirements: "Min 25K followers, travel content",
      description: "Seeking travel content creators for a 3-day stay at our luxury Miami location to create engaging content.",
      logo: "/api/placeholder/60/60",
      brandVerified: true,
      applicants: 78
    },
    {
      id: 6,
      title: "Sustainable Product Promotion",
      brand: "EcoLife",
      category: "Lifestyle",
      platform: "Instagram, Pinterest",
      compensation: "$1,200 + Products",
      deadline: "May 30, 2025",
      location: "Remote",
      requirements: "Min 5K followers, eco-friendly niche",
      description: "Partnering with sustainability advocates to highlight our new zero-waste home products.",
      logo: "/api/placeholder/60/60",
      brandVerified: true,
      applicants: 31
    }
  ]);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    platform: "",
    compensation: ""
  });

  const [filteredCampaigns, setFilteredCampaigns] = useState(campaigns);
  const [showFilters, setShowFilters] = useState(false);

  // Filter campaigns when filters change
  useEffect(() => {
    let filtered = campaigns;
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(campaign => 
        campaign.title.toLowerCase().includes(searchLower) || 
        campaign.brand.toLowerCase().includes(searchLower) || 
        campaign.description.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters.category) {
      filtered = filtered.filter(campaign => campaign.category === filters.category);
    }
    
    if (filters.platform) {
      filtered = filtered.filter(campaign => campaign.platform.includes(filters.platform));
    }
    
    if (filters.compensation) {
      // Simple filtering based on compensation, could be more sophisticated
      if (filters.compensation === "high") {
        filtered = filtered.filter(campaign => campaign.compensation.includes("3,000") || parseInt(campaign.compensation.replace(/\D/g, '')) >= 2500);
      } else if (filters.compensation === "medium") {
        filtered = filtered.filter(campaign => {
          const amount = parseInt(campaign.compensation.replace(/\D/g, ''));
          return amount >= 1500 && amount < 2500;
        });
      } else if (filters.compensation === "low") {
        filtered = filtered.filter(campaign => parseInt(campaign.compensation.replace(/\D/g, '')) < 1500);
      }
    }
    
    setFilteredCampaigns(filtered);
  }, [filters, campaigns]);

  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Get unique categories for filter options
  const categories = [...new Set(campaigns.map(campaign => campaign.category))];
  const platforms = ["Instagram", "TikTok", "YouTube", "Twitch", "Pinterest"];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Campaigns</h1>
          <p className="text-gray-600 mt-2">Discover and apply to brand campaigns that match your niche and audience</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search campaigns by brand or title..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
            <button 
              className="flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Sliders className="h-5 w-5 mr-2" />
              <span>Filters</span>
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg">
              Apply Filters
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category, idx) => (
                    <option key={idx} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={filters.platform}
                  onChange={(e) => handleFilterChange('platform', e.target.value)}
                >
                  <option value="">All Platforms</option>
                  {platforms.map((platform, idx) => (
                    <option key={idx} value={platform}>{platform}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Compensation</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={filters.compensation}
                  onChange={(e) => handleFilterChange('compensation', e.target.value)}
                >
                  <option value="">All Ranges</option>
                  <option value="high">High (≥ $2,500)</option>
                  <option value="medium">Medium ($1,500 - $2,499)</option>
                  <option value="low">Low (≥ $1,500)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                <select className="w-full border border-gray-300 rounded-lg p-2">
                  <option value="">Any Time</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="future">Future</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600">{filteredCampaigns.length} campaigns available</p>
          <div className="flex items-center">
            <span className="mr-2 text-gray-600">Sort by:</span>
            <select className="border border-gray-300 rounded-lg p-1 text-sm">
              <option>Newest</option>
              <option>Highest Paying</option>
              <option>Deadline (closest)</option>
              <option>Most Popular</option>
            </select>
          </div>
        </div>

        {/* Campaign Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <img 
                      src={campaign.logo} 
                      alt={`${campaign.brand} logo`} 
                      className="w-10 h-10 rounded-full mr-3 object-cover"
                    />
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-semibold text-gray-900">{campaign.brand}</h3>
                        {campaign.brandVerified && (
                          <span className="ml-1 text-blue-500">
                            <Star className="h-4 w-4 fill-blue-500" />
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Tag className="h-3 w-3 mr-1" />
                        <span>{campaign.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                    {campaign.platform}
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-2">{campaign.title}</h2>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{campaign.description}</p>
                
                <div className="flex flex-wrap gap-y-2 mb-4 text-sm">
                  <div className="w-1/2 flex items-center text-gray-600">
                    <Briefcase className="h-4 w-4 mr-1" />
                    <span>{campaign.compensation}</span>
                  </div>
                  <div className="w-1/2 flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Due {campaign.deadline}</span>
                  </div>
                  <div className="w-1/2 flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{campaign.location}</span>
                  </div>
                  <div className="w-1/2 flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{campaign.applicants} applied</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4 mt-2 flex items-center justify-between">
                  <div className="text-xs font-medium text-gray-500">
                    {campaign.requirements}
                  </div>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium text-sm">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md bg-blue-600 text-white">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">3</button>
            <span className="text-gray-500">...</span>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">8</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">Next</button>
          </nav>
        </div>

      </div>
    </div>
  );
};

export default CampaignsBrowsePage;