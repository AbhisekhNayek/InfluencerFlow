import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Sliders, MapPin, Calendar, Tag, Briefcase, Instagram, TrendingUp, Users, ChevronDown, Star, Image, ArrowUp, ArrowDown } from 'lucide-react';

const CampaignsBrowsePage = () => {
  // State for managing campaigns data
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [campaignsPerPage, setCampaignsPerPage] = useState(6);
  
  // Filter and sort state
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    platform: "",
    compensation: "",
    deadline: ""
  });
  
  const [sortOption, setSortOption] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  
  // Categories (this would come from backend but we're defining it here)
  const categories = [
    "Fashion & Style", "Beauty & Makeup", "Travel & Adventure", "Fitness & Health",
    "Food & Cooking", "Technology & Gadgets", "Gaming", "Education & Learning",
    "Entertainment & Comedy", "Business & Entrepreneurship", "Lifestyle", "Other"
  ];
  
  const platforms = ["Instagram", "TikTok", "YouTube", "Twitch", "Pinterest", "Twitter", "Facebook"];

  // Fetch campaigns from backend
  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        // This would be your actual API call
        // const response = await fetch('/api/campaigns');
        // const data = await response.json();
        
        // For now, we'll simulate a backend response with our sample data
        setTimeout(() => {
          const sampleData = {
            campaigns: [
              {
                id: 1,
                title: "Summer Collection Launch",
                brand: "FashionNova",
                category: "Fashion & Style",
                platform: "Instagram",
                compensation: "$2,000", 
                deadline: "May 15, 2025",
                location: "Remote",
                requirements: "Min 15K followers",
                description: "Looking for fashion influencers to promote our new summer collection with creative posts and stories. We need authentic content that showcases our products in real-world settings.",
                logo: "/api/placeholder/60/60",
                brandVerified: true,
                applicants: 43,
                mediaFiles: [
                  "/api/placeholder/800/500", 
                  "/api/placeholder/800/500"
                ]
              },
              {
                id: 2,
                title: "Healthy Lifestyle Product Review",
                brand: "VitaBoost",
                category: "Fitness & Health",
                platform: "Instagram, TikTok",
                compensation: "$1,500 + Products",
                deadline: "May 20, 2025",
                location: "Remote",
                requirements: "Min 10K followers, fitness niche",
                description: "Seeking fitness and wellness influencers to review our new vitamin supplement line through authentic content. Share your honest experience with our products and how they fit into your daily routine.",
                logo: "/api/placeholder/60/60",
                brandVerified: true,
                applicants: 27,
                mediaFiles: [
                  "/api/placeholder/800/500",
                  "/api/placeholder/800/500",
                  "/api/placeholder/800/500"
                ]
              },
              {
                id: 3,
                title: "Gaming Headset Launch",
                brand: "TechGear",
                category: "Technology & Gadgets",
                platform: "YouTube, Twitch",
                compensation: "$3,000 + Products",
                deadline: "May 25, 2025",
                location: "Remote",
                requirements: "Min 20K subscribers, gaming content",
                description: "Partnering with gaming content creators to showcase our new premium headset during gameplay streams. We want to highlight comfort during long sessions and superior sound quality for immersive gaming experiences.",
                logo: "/api/placeholder/60/60",
                brandVerified: true,
                applicants: 61,
                mediaFiles: [
                  "/api/placeholder/800/500"
                ]
              },
              {
                id: 4,
                title: "Beauty Product Tutorial",
                brand: "GlowCosmetics",
                category: "Beauty & Makeup",
                platform: "Instagram, YouTube",
                compensation: "$1,800 + PR Package",
                deadline: "May 18, 2025",
                location: "Remote",
                requirements: "Min 8K followers, beauty niche",
                description: "Looking for beauty influencers to create makeup tutorials featuring our new summer line. Show your audience how to achieve the perfect summer look with our products.",
                logo: "/api/placeholder/60/60",
                brandVerified: false,
                applicants: 52,
                mediaFiles: [
                  "/api/placeholder/800/500",
                  "/api/placeholder/800/500"
                ]
              },
              {
                id: 5,
                title: "Travel Content Series",
                brand: "WanderLux Hotels",
                category: "Travel & Adventure",
                platform: "Instagram, TikTok",
                compensation: "Free Stay + $2,500",
                deadline: "June 5, 2025",
                location: "Miami, FL",
                requirements: "Min 25K followers, travel content",
                description: "Seeking travel content creators for a 3-day stay at our luxury Miami location to create engaging content. Capture the essence of luxury travel and show your audience what makes our hotel experience unique.",
                logo: "/api/placeholder/60/60",
                brandVerified: true,
                applicants: 78,
                mediaFiles: [
                  "/api/placeholder/800/500",
                  "/api/placeholder/800/500",
                  "/api/placeholder/800/500",
                  "/api/placeholder/800/500"
                ]
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
                description: "Partnering with sustainability advocates to highlight our new zero-waste home products. Show how our products can be integrated into everyday life while reducing environmental impact.",
                logo: "/api/placeholder/60/60",
                brandVerified: true,
                applicants: 31,
                mediaFiles: [
                  "/api/placeholder/800/500",
                  "/api/placeholder/800/500"
                ]
              },
              {
                id: 7,
                title: "Cooking Tutorial Series",
                brand: "GourmetTools",
                category: "Food & Cooking",
                platform: "YouTube, Instagram",
                compensation: "$2,200 + Kitchen Set",
                deadline: "June 10, 2025",
                location: "Remote",
                requirements: "Min 12K followers, cooking content",
                description: "Looking for food content creators to showcase our premium kitchen tools in a series of cooking tutorials. Create delicious recipes while highlighting how our tools make cooking easier and more enjoyable.",
                logo: "/api/placeholder/60/60",
                brandVerified: true,
                applicants: 45,
                mediaFiles: [
                  "/api/placeholder/800/500",
                  "/api/placeholder/800/500"
                ]
              },
              {
                id: 8,
                title: "Online Course Promotion",
                brand: "LearnPro Academy",
                category: "Education & Learning",
                platform: "YouTube, LinkedIn",
                compensation: "$1,700 + Free Course Access",
                deadline: "June 15, 2025",
                location: "Remote",
                requirements: "Min 8K followers, educational content",
                description: "Seeking educational content creators to promote our new professional development courses. Share your learning journey and how our courses can help professionals advance their careers.",
                logo: "/api/placeholder/60/60",
                brandVerified: false,
                applicants: 19,
                mediaFiles: [
                  "/api/placeholder/800/500"
                ]
              }
            ],
            totalCampaigns: 8,
            totalPages: 2
          };
          
          setCampaigns(sampleData.campaigns);
          setTotalPages(sampleData.totalPages);
          setLoading(false);
        }, 500); // Simulate network delay
        
      } catch (err) {
        setError("Failed to fetch campaigns. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchCampaigns();
  }, [currentPage, sortOption]); // Re-fetch when page or sort changes

  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Apply filters
  const applyFilters = () => {
    // In a real application, this would trigger a new API call with filter parameters
    setCurrentPage(1); // Reset to first page when applying new filters
    // fetchCampaigns(1, sortOption, filters);
    
    // For demo purposes, we're just logging the filter values
    console.log("Applying filters:", filters);
  };
  
  // Handle sort change
  const handleSortChange = (option) => {
    setSortOption(option);
    // This would trigger re-fetch in useEffect
  };
  
  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    // This would trigger re-fetch in useEffect
  };
  
  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      // Calculate range around current page
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust range to show 3 pages
      if (startPage === 2) endPage = Math.min(totalPages - 1, startPage + 2);
      if (endPage === totalPages - 1) startPage = Math.max(2, endPage - 2);
      
      // Add ellipsis after first page if needed
      if (startPage > 2) pages.push("...");
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) pages.push("...");
      
      // Always include last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  // Card media carousel component
  const MediaCarousel = ({ mediaFiles }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const nextSlide = (e) => {
      e.preventDefault();
      setCurrentIndex((prev) => (prev + 1) % mediaFiles.length);
    };
    
    const prevSlide = (e) => {
      e.preventDefault();
      setCurrentIndex((prev) => (prev - 1 + mediaFiles.length) % mediaFiles.length);
    };

    if (!mediaFiles || mediaFiles.length === 0) return null;
    
    return (
      <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
        <img 
          src={mediaFiles[currentIndex]} 
          alt="Campaign media" 
          className="w-full h-full object-cover"
        />
        
        {mediaFiles.length > 1 && (
          <>
            <button 
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70"
            >
              ‹
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70"
            >
              ›
            </button>
            <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
              {mediaFiles.map((_, idx) => (
                <span 
                  key={idx} 
                  className={`w-2 h-2 rounded-full ${idx === currentIndex ? 'bg-[#104581]' : 'bg-gray-300'}`}
                ></span>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Campaigns</h1>
          <p className="text-gray-600 mt-2">Discover and apply to brand campaigns that match your niche and audience</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search campaigns by brand or title..."
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-[#104581] focus:border-[#104581]"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
            <button 
              className="flex items-center justify-center px-5 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Sliders className="h-5 w-5 mr-2" />
              <span>Filters</span>
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            <button 
              className="px-6 py-3 bg-[#104581] hover:bg-[#0d3a6d] text-white font-medium rounded-lg transition-colors"
              onClick={applyFilters}
            >
              Apply Filters
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg p-3"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg p-3"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Compensation</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg p-3"
                  value={filters.compensation}
                  onChange={(e) => handleFilterChange('compensation', e.target.value)}
                >
                  <option value="">All Ranges</option>
                  <option value="high">High (≥ $2,500)</option>
                  <option value="medium">Medium ($1,500 - $2,499)</option>
                  <option value="low">Low (&lt; $1,500)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg p-3"
                  value={filters.deadline}
                  onChange={(e) => handleFilterChange('deadline', e.target.value)}
                >
                  <option value="">Any Time</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="future">Future</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Count and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <p className="text-gray-600 mb-3 md:mb-0">
            {loading ? 'Loading campaigns...' : `${campaigns.length} campaigns available`}
          </p>
          <div className="flex items-center">
            <span className="mr-3 text-gray-600">Sort by:</span>
            <select 
              className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-[#104581] focus:border-[#104581]"
              value={sortOption}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="highestPaying">Highest Paying</option>
              <option value="deadline">Deadline (closest)</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#104581]"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Campaign Cards */}
        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <img 
                        src={campaign.logo} 
                        alt={`${campaign.brand} logo`} 
                        className="w-12 h-12 rounded-full mr-3 object-cover"
                      />
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-semibold text-gray-900">{campaign.brand}</h3>
                          {campaign.brandVerified && (
                            <span className="ml-1 text-[#104581]">
                              <Star className="h-4 w-4 fill-[#104581]" />
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Tag className="h-3 w-3 mr-1" />
                          <span>{campaign.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-50 text-[#104581] px-3 py-1 rounded-full text-xs font-medium">
                      {campaign.platform}
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{campaign.title}</h2>
                  
                  {/* Media Carousel */}
                  <MediaCarousel mediaFiles={campaign.mediaFiles} />
                  
                  <p className="text-gray-600 mb-6">{campaign.description}</p>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 mb-1">Compensation</span>
                      <span className="text-sm font-medium flex items-center">
                        <Briefcase className="h-4 w-4 mr-1 text-[#104581]" />
                        {campaign.compensation}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 mb-1">Deadline</span>
                      <span className="text-sm font-medium flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-[#104581]" />
                        {campaign.deadline}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 mb-1">Location</span>
                      <span className="text-sm font-medium flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-[#104581]" />
                        {campaign.location}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 mb-1">Applicants</span>
                      <span className="text-sm font-medium flex items-center">
                        <Users className="h-4 w-4 mr-1 text-[#104581]" />
                        {campaign.applicants} applied
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-5 mt-2 flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-500 px-3 py-1 bg-gray-50 rounded-full">
                      {campaign.requirements}
                    </div>
                    <Link to={`/guidelines/${campaign.id}`}>
                      <button className="px-6 py-2 bg-[#104581] hover:bg-[#0d3a6d] text-white rounded-lg font-medium text-sm transition-colors">
                        Apply Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="mt-10 flex justify-center">
            <nav className="flex items-center space-x-1">
              <button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1}
                className={`px-4 py-2 border rounded-md ${
                  currentPage === 1 
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>
              
              {getPageNumbers().map((page, index) => (
                page === "..." ? (
                  <span key={`ellipsis-${index}`} className="px-4 py-2 text-gray-500">...</span>
                ) : (
                  <button
                    key={`page-${page}`}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 border rounded-md ${
                      currentPage === page
                        ? 'bg-[#104581] text-white border-[#104581]'
                        : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                )
              ))}
              
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 border rounded-md ${
                  currentPage === totalPages 
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignsBrowsePage;