import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import axios from 'axios'; // Import axios for HTTP requests
import { toast } from 'react-toastify'; // Assuming you have toast for notifications

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function BrandSignIn() {
  const [formData, setFormData] = useState({
    businessName: '',
    legalEntityName: '',
    businessType: '', // Dropdown field
    category: '', // Dropdown field
    email: '',
    phoneNo: '',
    address: '',
    websiteOrSocialMedia: '',
    brandLogo: null, // For brand logo file
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize the navigation hook

  // Dropdown options for business type
  const businessTypes = [
    "Sole Proprietorship",
    "Partnership",
    "Limited Liability Company (LLC)",
    "Corporation",
    "Non-Profit Organization",
    "Other"
  ];

  // Dropdown options for category/niche
  const categories = [
    "Fashion & Apparel",
    "Beauty & Cosmetics",
    "Food & Beverage",
    "Technology",
    "Health & Fitness",
    "Travel & Hospitality",
    "Entertainment",
    "Education",
    "Finance",
    "Retail",
    "Other"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle file input for brand logo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      brandLogo: file
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.businessName) newErrors.businessName = "Business name is required";
    if (!formData.legalEntityName) newErrors.legalEntityName = "Legal entity name is required";
    if (!formData.businessType) newErrors.businessType = "Please select a business type";
    if (!formData.category) newErrors.category = "Please select a category/niche";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phoneNo) newErrors.phoneNo = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phoneNo)) newErrors.phoneNo = "Phone number must be 10 digits";
    if (!formData.address) newErrors.address = "Registered business address is required";
    if (!formData.websiteOrSocialMedia) newErrors.websiteOrSocialMedia = "Website or social media link is required";
    if (!formData.brandLogo) newErrors.brandLogo = "Brand logo is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    console.log("Form submitted:", formData);

    // Create FormData to handle file upload
    const formDataToSend = new FormData();
    formDataToSend.append('businessName', formData.businessName);
    formDataToSend.append('legalEntityName', formData.legalEntityName);
    formDataToSend.append('businessType', formData.businessType);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phoneNo', formData.phoneNo);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('websiteOrSocialMedia', formData.websiteOrSocialMedia);
    // Fixed field name to match what the backend expects
    formDataToSend.append('brand_logo', formData.brandLogo);

    // Call backend API to register brand
    try {
      // Capture the response from axios
      const response = await axios.post(`${apiBaseUrl}/api/brands/register`, formDataToSend, {
        headers: {
          'x-auth-token': localStorage.getItem('token'), // Use the header name your backend expects
          'Content-Type': 'multipart/form-data', // Set Content-Type to handle file upload
        }
      });
      
      // Handle successful response
      toast.success("Brand registration successful!");
      navigate("/business-dashboard");
    } catch (error) {
      toast.error("There was an error with the submission. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute z-0 w-40 h-40 top-0 right-20 bg-gradient-to-br from-blue-200 via-blue-100 to-white rounded-full opacity-60 blur-2xl"></div>
      <div className="absolute z-0 w-80 h-80 bottom-40 right-20 bg-gradient-to-tr from-pink-200 via-pink-100 to-white rounded-full opacity-50 blur-3xl"></div>
      <div className="absolute z-0 w-40 h-40 bottom-20 left-20 bg-gradient-to-bl from-slate-200 via-white to-slate-100 rounded-full opacity-40 blur-2xl"></div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
            Brand Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Name */}
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                Business Name
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your business name"
              />
              {errors.businessName && <p className="mt-1 text-sm text-red-500">{errors.businessName}</p>}
            </div>

            {/* Legal Entity Name */}
            <div>
              <label htmlFor="legalEntityName" className="block text-sm font-medium text-gray-700 mb-1">
                Legal Entity Name
              </label>
              <input
                type="text"
                id="legalEntityName"
                name="legalEntityName"
                value={formData.legalEntityName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your legal entity name"
              />
              {errors.legalEntityName && <p className="mt-1 text-sm text-red-500">{errors.legalEntityName}</p>}
            </div>

            {/* Brand Logo */}
            <div>
              <label htmlFor="brandLogo" className="block text-sm font-medium text-gray-700 mb-1">
                Upload Brand Logo
              </label>
              <input
                type="file"
                id="brandLogo"
                name="brandLogo"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.brandLogo && <p className="mt-1 text-sm text-red-500">{errors.brandLogo}</p>}
            </div>

            {/* Business Type */}
            <div>
              <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">
                Business Type
              </label>
              <select
                id="businessType"
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select your business type</option>
                {businessTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.businessType && <p className="mt-1 text-sm text-red-500">{errors.businessType}</p>}
            </div>

            {/* Category/Niche */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category/Niche
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select your category/niche</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
            </div>

            {/* Official Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Official Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your business email"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNo"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your phone number"
              />
              {errors.phoneNo && <p className="mt-1 text-sm text-red-500">{errors.phoneNo}</p>}
            </div>

            {/* Business Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Registered Business Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your business address"
              />
              {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
            </div>

            {/* Website or Social Media */}
            <div>
              <label htmlFor="websiteOrSocialMedia" className="block text-sm font-medium text-gray-700 mb-1">
                Website or Social Media Link
              </label>
              <input
                type="text"
                id="websiteOrSocialMedia"
                name="websiteOrSocialMedia"
                value={formData.websiteOrSocialMedia}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your website or social media link"
              />
              {errors.websiteOrSocialMedia && <p className="mt-1 text-sm text-red-500">{errors.websiteOrSocialMedia}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Register Brand
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}