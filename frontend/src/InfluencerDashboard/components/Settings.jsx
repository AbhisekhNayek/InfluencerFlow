import React, { useState } from 'react';
import { FaUser, FaBell, FaLink, FaTrash } from 'react-icons/fa';

const Settings = () => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl space-y-10">
      <h2 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2">
        <FaUser className="text-blue-600" /> Settings
      </h2>

      {/* Profile Settings */}
      <section>
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">👤 Profile Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Bio</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Your Bio"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition">
            Update Profile
          </button>
        </div>
      </section>

      {/* Notification Settings */}
      <section>
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">🔔 Notification Settings</h3>
        <div className="space-y-3">
          <Toggle label="Push Notifications" checked={pushNotifications} onChange={() => setPushNotifications(!pushNotifications)} />
          <Toggle label="Email Notifications" checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} />
          <Toggle label="SMS Notifications" checked={smsNotifications} onChange={() => setSmsNotifications(!smsNotifications)} />
        </div>
      </section>

      {/* Connected Accounts */}
      <section>
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">🔗 Connected Accounts</h3>
        {['YouTube', 'Instagram', 'Facebook'].map((platform) => (
          <div key={platform} className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-700 font-medium">{platform}</span>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-1 rounded transition">
              Connect
            </button>
          </div>
        ))}
      </section>

      {/* Danger Zone */}
      <section>
        <h3 className="text-2xl font-semibold text-red-600 mb-2 flex items-center gap-2">
          <FaTrash /> Danger Zone
        </h3>
        <p className="text-gray-600 mb-4">
          Permanently delete your account and all of your content.
        </p>
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg transition">
          Delete Account
        </button>
      </section>
    </div>
  );
};

const Toggle = ({ label, checked, onChange }) => (
  <div className="flex justify-between items-center">
    <label className="text-gray-700">{label}</label>
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="form-checkbox h-5 w-5 text-blue-600 transition focus:ring-blue-500"
    />
  </div>
);

export default Settings;
