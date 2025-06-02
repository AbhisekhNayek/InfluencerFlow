import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OngoingCampaigns from './components/OngoingCampaigns';
import Influencers from './components/Influencers';
import Payments from './components/Payments';
import PendingVerifications from './components/PendingVerifications';
import DashboardHeader from './components/DashboardHeader';

const dummyCampaigns = [
  { id: 1, name: "Summer Sale", brand: "FashionCo", startDate: "2023-06-01", endDate: "2023-06-30", status: "Active" },
  { id: 2, name: "Tech Launch", brand: "GadgetPro", startDate: "2023-07-15", endDate: "2023-08-15", status: "Pending" },
  { id: 3, name: "Back to School", brand: "EduStore", startDate: "2023-08-01", endDate: "2023-09-01", status: "Completed" },
  { id: 4, name: "Winter Collection", brand: "FashionCo", startDate: "2023-11-01", endDate: "2023-12-31", status: "Active" },
];

// Dummy data for influencers
const dummyInfluencers = [
  { id: 1, name: 'Influencer One', email: 'influencer1@example.com', socialMedia: 'Instagram', followers: '100K' },
  { id: 2, name: 'Influencer Two', email: 'influencer2@example.com', socialMedia: 'TikTok', followers: '50K' },
  { id: 3, name: 'Influencer Three', email: 'influencer3@example.com', socialMedia: 'YouTube', followers: '200K' },
];

const dummyPayments = [
  { id: 1, date: "2023-10-01", amount: "$500", influencer: "Influencer One", brand: "FitStyle", status: "Paid" },
  { id: 2, date: "2023-09-15", amount: "$300", influencer: "Influencer Two", brand: "GlowCosmetics", status: "Pending" },
  { id: 3, date: "2023-08-22", amount: "$650", influencer: "Influencer Three", brand: "TechGadgets", status: "Paid" },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('ongoing campaigns');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const navigate = useNavigate();

  const user = {
    name: "Admin User",
    avatar: "/api/placeholder/80/80",
    role: "Administrator"
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const icons = {
    revenue: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    collaborations: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    document: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.25A3.375 3.375 0 001.875 5.25v13.5a3.375 3.375 0 003.375 3.375h13.5A3.375 3.375 0 0022.125 18.75v-2.25m-5.25-1.875v-2.625c0-.865-.333-1.575-.928-2.171a1.125 1.125 0 00-1.586-.427l-1.09-.363c-.439-.145-.763-.5-.91-.867-.144-.365-.039-.758.26-1.05L13.31 5.5 15 3.75" />
      </svg>
    ),
    logout: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
    ),
    profile: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    settings: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    menu: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
    notification: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    overview: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  };

  return (
    <div className="h-screen w-screen flex bg-[#96AED0] overflow-hidden">
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-gray-900 text-white flex flex-col transition-all duration-300`}>
        <div className="py-4 px-3 border-b border-gray-800 flex justify-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {sidebarCollapsed ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              )}
            </svg>
          </button>
        </div>
        <nav className="mt-6 flex-grow">
          <ul>
            {[
              { id: 'pending verifications', icon: 'document' },
              { id: 'ongoing campaigns', icon: 'overview' },
              { id: 'influencers', icon: 'collaborations' },
              { id: 'payments', icon: 'revenue' },
            ].map((item) => (
              <li key={item.id}>
                <button
                  className={`w-full text-left px-3 py-3 flex items-center ${activeTab === item.id
                      ? 'bg-blue-600 text-white font-medium'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <span className={`${sidebarCollapsed ? 'mx-auto' : ''}`}>
                    {icons[item.icon]}
                  </span>
                  {!sidebarCollapsed && (
                    <span className="ml-3 capitalize">{item.id}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {!sidebarCollapsed && (
          <div className="p-4 text-gray-400 text-xs border-t border-gray-800">
            <p>© 2023 Influencer Platform</p>
            <p>Version 2.1.0</p>
          </div>
        )}
      </div>
      <div className="flex-grow overflow-y-auto">
        <DashboardHeader
          activeTab={activeTab}
          toggleUserMenu={toggleUserMenu}
          userMenuOpen={userMenuOpen}
          user={user}
          icons={icons}
        />
        {/* Wavy bottom border */}
  <div className="relative bg-[#96AED0] w-full overflow-hidden h-12">
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 1440 120" 
    preserveAspectRatio="none"
    className="absolute bottom-0 w-full h-full"
  >
    <path 
      fill="#ffffff" 
      d="M0,64L40,53.3C80,43,160,21,240,32C320,43,400,85,480,96C560,107,640,85,720,74.7C800,64,880,64,960,69.3C1040,75,1120,85,1200,80C1280,75,1360,53,1400,42.7L1440,32L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
    />
  </svg>
  <div className="absolute bottom-0 w-full"></div>
</div>

        <main className="p-6">
          {activeTab === 'pending verifications' && <PendingVerifications />}
          {activeTab === 'ongoing campaigns' && <OngoingCampaigns campaigns={dummyCampaigns}/>}
          {activeTab === 'influencers' && <Influencers influencers={dummyInfluencers}/>}
          {activeTab === 'payments' && <Payments payments={dummyPayments}/>}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;