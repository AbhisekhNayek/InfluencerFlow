import React, { useState } from 'react';
import { FaUser, FaBuilding, FaBell, FaCreditCard, FaTrashAlt } from 'react-icons/fa';

const BusinessSettings = () => {
  const [companyName, setCompanyName] = useState('Your Company Name');
  const [industry, setIndustry] = useState('Your Industry');
  const [companyBio, setCompanyBio] = useState('A brief description about your company.');
  const [paymentMethod, setPaymentMethod] = useState('**** **** **** 1234');
  const [billingAddress, setBillingAddress] = useState('123 Business St, City, Country');
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const handlePushToggle = () => setPushNotifications(!pushNotifications);
  const handleEmailToggle = () => setEmailNotifications(!emailNotifications);
  const handleSmsToggle = () => setSmsNotifications(!smsNotifications);

  return (
    <div className="container mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Business Settings</h1>

      {/* Profile Settings */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <FaBuilding className="mr-2" /> Profile Settings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="industry">
              Industry
            </label>
            <input
              type="text"
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyBio">
            Company Bio
          </label>
          <textarea
            id="companyBio"
            value={companyBio}
            onChange={(e) => setCompanyBio(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
          ></textarea>
        </div>
      </section>

      {/* Billing Information */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <FaCreditCard className="mr-2" /> Billing Information
        </h2>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentMethod">
            Payment Method
          </label>
          <input
            type="text"
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="billingAddress">
            Billing Address
          </label>
          <textarea
            id="billingAddress"
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
          ></textarea>
        </div>
      </section>

      {/* Notification Settings */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <FaBell className="mr-2" /> Notification Settings
        </h2>
        <div className="flex items-center justify-between py-2">
          <label htmlFor="pushNotifications" className="text-gray-700">Push Notifications</label>
          <input type="checkbox" id="pushNotifications" checked={pushNotifications} onChange={handlePushToggle} className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
        </div>
        <div className="flex items-center justify-between py-2">
          <label htmlFor="emailNotifications" className="text-gray-700">Email Notifications</label>
          <input type="checkbox" id="emailNotifications" checked={emailNotifications} onChange={handleEmailToggle} className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
        </div>
        <div className="flex items-center justify-between py-2">
          <label htmlFor="smsNotifications" className="text-gray-700">SMS Notifications</label>
          <input type="checkbox" id="smsNotifications" checked={smsNotifications} onChange={handleSmsToggle} className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
        </div>
      </section>

      {/* Danger Zone */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <FaTrashAlt className="mr-2 text-red-500" /> Danger Zone
        </h2>
        <p className="text-gray-600">Permanently delete your account and all associated data.</p>
        <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Delete Account
        </button>
      </section>
    </div>
  );
};

export default BusinessSettings;