import React from 'react';

const PreviousCampaigns = ({ campaigns }) => {
  const dummyCampaigns = [
    {
      id: 1,
      name: 'Summer Sale 2023',
      startDate: '2023-06-01',
      endDate: '2023-06-30',
      status: 'Completed',
      impressions: 150000,
      engagement: 7500,
      conversions: 500,
    },
    {
      id: 2,
      name: 'Tech Launch',
      startDate: '2023-07-15',
      endDate: '2023-08-15',
      status: 'Completed',
      impressions: 120000,
      engagement: 6000,
      conversions: 400,
    },
    {
      id: 3,
      name: 'Back to School',
      startDate: '2023-08-01',
      endDate: '2023-09-01',
      status: 'Completed',
      impressions: 100000,
      engagement: 5000,
      conversions: 300,
    },
  ];

  const campaignsData = campaigns || dummyCampaigns;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Previous Campaigns</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Campaign Name
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Date
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {campaignsData.map((campaign) => (
              <tr key={campaign.id}>
                <td className="py-4 px-6 text-sm text-gray-900">{campaign.name}</td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {campaign.startDate}
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">{campaign.endDate}</td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      campaign.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : campaign.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : campaign.status === 'Completed'
                        ? 'bg-blue-100 text-blue-800'
                        : ''
                    }`}
                  >
                    {campaign.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PreviousCampaigns;