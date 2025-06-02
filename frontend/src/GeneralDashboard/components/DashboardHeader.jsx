import React from 'react';
import { AiOutlineBell } from 'react-icons/ai';

const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between px-5 md:px-10 py-4 bg-white shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>
      <div className="flex items-center space-x-4">
        <AiOutlineBell className="text-2xl text-gray-600 cursor-pointer" />
        <span className="text-gray-700 font-medium">Sarah Johnson</span>
        <img src="/path/to/profile-picture.jpg" alt="Profile" className="w-10 h-10 rounded-full" />
      </div>
    </div>
  );
};

export default DashboardHeader;