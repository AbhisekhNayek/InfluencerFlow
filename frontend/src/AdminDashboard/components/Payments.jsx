/**
 * This is the Payments component, that shows a list of the payments to influencers.
 */
import React from 'react';

const Payments = ({ payments}) => {
  const dummyPayments = [
    { id: 1, date: "2023-10-26", amount: "$500", influencer: "John Doe", brand: "Brand A", status: "Paid" },
    { id: 2, date: "2023-10-20", amount: "$300", influencer: "Jane Smith", brand: "Brand B", status: "Pending" },
    { id: 3, date: "2023-10-15", amount: "$450", influencer: "Mike Brown", brand: "Brand C", status: "Pending" },
    { id: 4, date: "2023-10-01", amount: "$500", influencer: "John Doe", brand: "Brand A", status: "Paid" },
    { id: 5, date: "2023-09-15", amount: "$300", influencer: "Jane Smith", brand: "Brand B", status: "Pending" },
    { id: 6, date: "2023-08-22", amount: "$650", influencer: "Mike Brown", brand: "Brand C", status: "Paid" },
    { id: 7, date: "2023-07-30", amount: "$800", influencer: "Emily Wilson", brand: "Brand D", status: "Paid" },
    { id: 8, date: "2023-07-10", amount: "$250", influencer: "David Lee", brand: "Brand E", status: "Pending" },
  ];



  const paymentsData = payments || dummyPayments;


  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Payments</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Influencer</th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paymentsData.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="py-4 px-6 text-sm text-gray-900">{payment.date}</td>
                <td className="py-4 px-6 text-sm text-gray-900">{payment.amount}</td>
                <td className="py-4 px-6 text-sm text-gray-900">{payment.influencer}</td>
                <td className="py-4 px-6 text-sm text-gray-900">{payment.brand}</td>
                <td className="py-4 px-6 text-sm">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      payment.status === 'Paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm">
                  <button className="text-blue-600 hover:text-blue-800">Pay</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;