import React from 'react';


const DashboardHeader = ({ user, icons, userMenuOpen, toggleUserMenu, activeTab }) => {
  return (
    <header className="bg-white py-3 px-6 border-b border-gray-200 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          {activeTab === 'overview' ? 'Dashboard Overview' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h1>
        <div className="flex items-center space-x-4">
          {/* Notification button */}
          <button className="relative p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200">
            {icons.notification}
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          
          {/* User profile moved to right side */}
          <div className="relative">
            <div 
              className="flex items-center cursor-pointer"
              onClick={toggleUserMenu}
            >
              
                <span className="w-8 h-8 text-gray-500">{icons.profile}</span>
              
              
                <div className="hidden md:block ml-3">
                <h3 className="font-medium text-sm text-gray-800">{user.name}</h3>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {/* User dropdown menu */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <ul className="py-1">
                  <li className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer">
                    <span className="mr-2 text-gray-500">{icons.profile}</span>
                    <span className="text-sm">Profile</span>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer">
                    <span className="mr-2 text-gray-500">{icons.settings}</span>
                    <span className="text-sm">Settings</span>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 flex items-center text-red-600 cursor-pointer border-t border-gray-100">
                    <span className="mr-2">{icons.logout}</span>
                    <span className="text-sm">Logout</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
    
  );
};

export default DashboardHeader;


 