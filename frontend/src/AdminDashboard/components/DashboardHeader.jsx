import React from 'react';

const DashboardHeader = ({ activeTab, toggleUserMenu, userMenuOpen, user = {}, icons = {} }) => {
  return (
    <header className="h-16 bg-white px-6 flex items-center justify-between shadow-sm">
      {/* Page Title */}
      <h1 className="text-xl font-semibold text-gray-800">
        {activeTab ? activeTab.charAt(0).toUpperCase() + activeTab.slice(1) : 'Admin Dashboard'}
      </h1>

      {/* Right Side Icons and User */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <button
          className="relative p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200"
          aria-label="Notifications"
        >
          {icons.notification}
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={toggleUserMenu}
          >
          <span className="text-gray-500">
              {icons.profile}
            </span>
            <span className="text-sm text-gray-800 font-medium hidden md:inline">
              {user?.name || 'User'}
              </span>
            {icons.chevronDown ? (
              <span className="text-gray-500">{icons.chevronDown}</span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </div>

          {/* Dropdown Menu */}
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
