import React from 'react';
import { icons } from '../InfluencerDashboard';

const Sidebar = ({ sidebarCollapsed, toggleSidebar, activeTab, setActiveTab, icons }) => {
  return (
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
            { id: 'overview', icon: 'overview' },
            { id: 'collaborations', icon: 'collaborations' },
            { id: 'payments', icon: 'revenue' },
            { id: 'analytics', icon: 'analytics' },
            { id: 'performance', icon: 'performance' },
            { id: 'settings', icon: 'settings' }
          ].map((item) => (
            <li key={item.id}>
              <button
                className={`w-full text-left px-3 py-3 flex items-center ${
                  activeTab === item.id
                    ? 'bg-[#104581] text-white font-medium'
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
  );
};

export default Sidebar;