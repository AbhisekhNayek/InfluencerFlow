import React, { useState } from 'react';

const Wallet = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Add Funds submitted:', { paymentMethod, amount, notes });
  };

  return (
    <div className="space-y-8">
      {/* Wallet Overview */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Wallet Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Current Balance</h3>
            <p className="text-2xl font-bold text-gray-900">$10,000</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Total Spent</h3>
            <p className="text-2xl font-bold text-gray-900">$2,500</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Pending Payouts</h3>
            <p className="text-2xl font-bold text-gray-900">$500</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Upcoming Deductions</h3>
            <p className="text-2xl font-bold text-gray-900">$1,000</p>
          </div>
        </div>
      </div>

      {/* Add Funds */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Add Funds</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
              Payment Method
            </label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            >
              <option value="">Select Payment Method</option>
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Funds
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Wallet;