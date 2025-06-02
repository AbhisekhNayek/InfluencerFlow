import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBuilding, FaEnvelope, FaGlobe } from 'react-icons/fa';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const BusinessProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    logo: '',
    businessName: '',
    website: '',
    industry: '',
    description: '',
    email: '',
  });

  useEffect(() => {
    const fetchBusinessProfile = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/brands/getprofile`, {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        });
        const data = response.data;
        setFormData({
          logo: data.logo || '',
          businessName: data.businessName || '',
          website: data.website || '',
          industry: data.industry || '',
          description: data.description || '',
          email: data.email || '',
        });
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };
    fetchBusinessProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       
      await axios.put(`${apiBaseUrl}/api/brands/update`, formData, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      });
      navigate('/business-dashboard');
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const industryOptions = [
    "Fashion & Apparel", "Beauty & Cosmetics", "Food & Beverage", "Technology",
    "Health & Fitness", "Travel & Hospitality", "Entertainment", "Education",
    "Finance", "Retail", "Other"
  ];

  return (
    <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#eef2f7] to-white min-h-screen">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <FaBuilding className="text-[#104581]" /> Business Profile
          </h2>
          <p className="text-gray-500 text-sm mt-1">Update your business details to attract the right influencers.</p>
        </div>

        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          {formData.logo ? (
            <img
              src={formData.logo}
              alt="Business Logo"
              className="h-24 w-24 rounded-full object-cover border-4 border-[#104581]"
            />
          ) : (
            <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
              No Logo
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
          <InputField label="Business Name" name="businessName" value={formData.businessName} onChange={handleChange} />
          <InputField label="Website" name="website" value={formData.website} onChange={handleChange} icon={<FaGlobe className="text-blue-500 ml-1" />} />
          
          <div>
            <label htmlFor="industry" className="block text-gray-700 font-medium mb-2">
              Industry
            </label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#104581] focus:border-transparent bg-white"
            >
              {industryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <InputField label="Description" name="description" value={formData.description} onChange={handleChange} />
          <InputField label="Contact Email" name="email" type="email" value={formData.email} onChange={handleChange} icon={<FaEnvelope className="text-gray-500" />} />

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

const InputField = ({ label, name, value, onChange, icon = null, type = 'text' }) => (
  <div>
    <label htmlFor={name} className="block text-gray-700 font-medium mb-1">{label}</label>
    <div className="relative">
      {icon && <span className="absolute left-3 top-1/2 transform -translate-y-1/2">{icon}</span>}
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

const TextAreaField = ({ label, name, value, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-gray-700 font-medium mb-1">{label}</label>
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

export default BusinessProfile;
