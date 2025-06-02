import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaEnvelope, FaUserEdit } from 'react-icons/fa';

const InfluencerProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profilePicture: '',
    displayName: 'Jane Doe',
    username: '@janedoe',
    bio: 'Lifestyle and travel influencer. Exploring the world and sharing my adventures.',
    instagram: 'instagram.com/janedoe',
    twitter: 'twitter.com/janedoe',
    tiktok: 'tiktok.com/@janedoe',
    email: 'jane.doe@example.com',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Profile:', formData);
    navigate('/influencer-dashboard'); // Navigate to home after updating
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePicture' && files.length > 0) {
      const imageUrl = URL.createObjectURL(files[0]);
      setFormData((prev) => ({
        ...prev,
        profilePicture: imageUrl,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#f0f4f8] to-white min-h-screen">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <FaUserEdit className="text-[#104581]" /> Influencer Profile
          </h2>
          <p className="text-gray-500 text-sm mt-1">Keep your profile updated to connect better with brands.</p>
        </div>

        {/* Profile Picture Preview */}
        <div className="flex flex-col items-center gap-4">
          {formData.profilePicture ? (
            <img
              src={formData.profilePicture}
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover border-4 border-[#104581]"
            />
          ) : (
            <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
              No Image
            </div>
          )}
          <input
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={handleChange}
            className="text-sm text-gray-600"
          />
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
          <InputField label="Display Name" name="displayName" value={formData.displayName} onChange={handleChange} />
          <InputField label="Username" name="username" value={formData.username} onChange={handleChange} />
          <TextAreaField label="Bio" name="bio" value={formData.bio} onChange={handleChange} />

          <InputField
            label="Instagram"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            icon={<FaInstagram className="text-pink-500 ml-1" />}
          />
          <InputField
            label="Contact Email"
            name="email"
            value={formData.email}
            type="email"
            onChange={handleChange}
            icon={<FaEnvelope className="text-gray-500 ml-1" />}
          />

          <div className="text-right">
            <button
              type="submit"
              className="bg-[#104581] hover:bg-[#0d3766] text-white font-semibold py-2 px-6 rounded-xl shadow transition-all duration-200"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable input component
const InputField = ({ label, name, value, onChange, icon = null, type = 'text' }) => (
  <div>
    <label htmlFor={name} className="block text-gray-700 font-medium mb-1">
      {label}
    </label>
    <div className="relative flex items-center">
      {icon && <div className="pl-3">{icon}</div>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#104581] focus:border-transparent bg-white`}
      />
    </div>
  </div>
);

// Reusable textarea component
const TextAreaField = ({ label, name, value, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-gray-700 font-medium mb-1">
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      rows="4"
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#104581] focus:border-transparent bg-white resize-none"
    />
  </div>
);

export default InfluencerProfile;