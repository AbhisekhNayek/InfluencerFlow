import React from "react";
// This is the AvailableOpportunities component, that shows the available collaborations for the user.

const AvailableOpportunities = ({
  availableCollaborations,
  navigateToAvailableOpportunities,
}) => {
  return (
    <div className="mb-8 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Available Opportunities
        </h2>
        <button
          className="text-[#104581] text-sm hover:text-blue-800"
          onClick={navigateToAvailableOpportunities}
        >
          Browse More
        </button>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {availableCollaborations.map((collab) => (
          <div key={collab.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <img src={collab.logo} alt={`${collab.brand} logo`} className="w-10 h-10 rounded object-cover mr-3" />
              <div className="flex-grow">
                <h3 className="font-medium text-gray-800">
                  {collab.brand}
                </h3>
                <span className="font-bold text-gray-900">
                  {collab.payment}
                </span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              {collab.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Deadline: {collab.deadline}</span> <button className="px-3 py-1 bg-[#104581] text-white text-sm rounded hover:bg-blue-700">Apply</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableOpportunities;