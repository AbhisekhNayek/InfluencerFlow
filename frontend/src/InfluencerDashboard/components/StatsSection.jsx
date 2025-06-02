// This is the StatsSection component, that shows the main stats of the user.
import React from 'react';


const StatsSection = ({ stats, icons }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
        >
          <div className="flex items-start">
            <div className="p-3 rounded-lg bg-blue-100 text-[#104581] mr-4">{/* Use icons prop to render icon */}
              {icons[stat.icon]}
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;