import React from "react";

/** This is the PreviousCollaborations component, that shows a table of the previous collaborations of the user. */

const PreviousCollaborations = ({ previousCollaborations }) => {
  return (
    <div className="mb-8 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Previous Collaborations
        </h2>
        <button className="text-[#104581] text-sm hover:text-blue-800">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Brand
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {previousCollaborations.map((collab) => {
              return (
                <tr key={collab.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {collab.brand}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {collab.type}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {collab.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {collab.payment}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PreviousCollaborations;