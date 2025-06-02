
import React from 'react';

const DashboardOverview = () => {
  const icons = {
        profile: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ),
      };
  const stats = [
    { title: 'Impressions', value: '120,000' },
    { title: 'Engagement', value: '15,000' },
    { title: 'Conversions', value: '2,500' },
    { title: 'ROI', value: '150%' },
  ];

  const topInfluencers = [
    { id: 1, name: 'Influencer One', handle: '@influencerone', followers: '100K', engagement: '10%', avatar: "/api/placeholder/80/80" },
    { id: 2, name: 'Influencer Two', handle: '@influencertwo', followers: '50K', engagement: '15%', avatar: "/api/placeholder/80/80" },
    { id: 3, name: 'Influencer Three', handle: '@influencerthree', followers: '200K', engagement: '8%', avatar: "/api/placeholder/80/80" },
    { id: 4, name: 'Influencer Four', handle: '@influencerfour', followers: '20K', engagement: '20%', avatar: "/api/placeholder/80/80" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Top Performing Influencers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topInfluencers.map((influencer) => (
            <div key={influencer.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                  {icons.profile}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{influencer.name}</h3>
                  <p className="text-sm text-gray-500">{influencer.handle}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">Followers: {influencer.followers}</p>
                <p className="text-sm text-gray-600">Engagement: {influencer.engagement}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;

