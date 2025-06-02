import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // Added toast for consistent notifications

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function InfluencerSignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    gmail: '',
    contactNo: '',
    instaId: '',
    youtubeChannel: '',
    pincode: '',
    category: ''
  });

  const [errors, setErrors] = useState({});
  const [allowPermission, setAllowPermission] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [instagramId, setInstagramId] = useState(null);

  const categories = [
    "Fashion & Style", "Beauty & Makeup", "Travel & Adventure", "Fitness & Health",
    "Food & Cooking", "Technology & Gadgets", "Gaming", "Education & Learning",
    "Entertainment & Comedy", "Business & Entrepreneurship", "Lifestyle", "Other"
  ];

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');
  
    if (code) {

      axios
        .get(`${apiBaseUrl}/api/influencers/verify-instagram?code=${code}`, {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        })
        .then(res => {
          if (res.data.success) {
            setAllowPermission(true);
            setAccessToken(res.data.accessToken);
            setInstagramId(res.data.instagramId);
            toast.success("Instagram verified successfully");
          } else {
            toast.error("Instagram verification failed");
          }
        })
        .catch(err => {
          console.error("Error verifying Instagram:", err);
          toast.error("Error connecting Instagram. Please try again.");
        });
    }
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.gmail) newErrors.gmail = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.gmail)) newErrors.gmail = "Email is invalid";
    if (!formData.contactNo) newErrors.contactNo = "Contact number is required";
    else if (!/^\d{10}$/.test(formData.contactNo)) newErrors.contactNo = "Contact must be 10 digits";
    if (!formData.instaId) newErrors.instaId = "Instagram ID is required";
    if (!formData.youtubeChannel) newErrors.youtubeChannel = "YouTube channel is required";
    if (!formData.pincode) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Pincode must be 6 digits";
    if (!formData.category) newErrors.category = "Please select a category";
    return newErrors;
  };

  const handleConnectInstagram = () => {
    window.location.href = "https://micromatch-flask-server.onrender.com/server/login";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!allowPermission || !accessToken || !instagramId) {
      toast.warning("Please connect Instagram to continue.");
      return;
    }

    try {
      const res = await axios.post(`${apiBaseUrl}/api/influencers/register`, {
        ...formData,
        accessToken,
        instagramId
      }, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });

      toast.success("Sign-in successful!");
      setFormData({
        name: '',
        gmail: '',
        contactNo: '',
        instaId: '',
        youtubeChannel: '',
        pincode: '',
        category: ''
      });
      setErrors({});
      navigate('/influencer-dashboard');
    } catch (err) {
      console.error(err);
      toast.error("Sign-in failed. Please try again.");
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
            Influencer Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your full name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="gmail" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="gmail"
                name="gmail"
                value={formData.gmail}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="example@gmail.com"
              />
              {errors.gmail && <p className="mt-1 text-sm text-red-500">{errors.gmail}</p>}
            </div>

            {/* Contact Number */}
            <div>
              <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number
              </label>
              <input
                type="tel"
                id="contactNo"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="10-digit contact number"
                maxLength="10"
              />
              {errors.contactNo && <p className="mt-1 text-sm text-red-500">{errors.contactNo}</p>}
            </div>

            {/* Instagram ID */}
            <div>
              <label htmlFor="instaId" className="block text-sm font-medium text-gray-700 mb-1">
                Instagram ID
              </label>
              <input
                type="text"
                id="instaId"
                name="instaId"
                value={formData.instaId}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Your Instagram handle"
              />
              {errors.instaId && <p className="mt-1 text-sm text-red-500">{errors.instaId}</p>}
            </div>

            {/* YouTube Channel */}
            <div>
              <label htmlFor="youtubeChannel" className="block text-sm font-medium text-gray-700 mb-1">
                YouTube Channel
              </label>
              <input
                type="url"
                id="youtubeChannel"
                name="youtubeChannel"
                value={formData.youtubeChannel}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="URL of your YouTube channel"
              />
              {errors.youtubeChannel && <p className="mt-1 text-sm text-red-500">{errors.youtubeChannel}</p>}
            </div>

            {/* Pincode */}
            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                Pincode
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="6-digit pincode"
                maxLength="6"
              />
              {errors.pincode && <p className="mt-1 text-sm text-red-500">{errors.pincode}</p>}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select your category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
            </div>

            {/* Instagram Connect Button */}
            <div className="pt-2">
              {!allowPermission ? (
                <button
                  type="button"
                  onClick={handleConnectInstagram}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition duration-200"
                >
                  Connect Instagram
                </button>
              ) : (
                <div className="flex items-center text-green-600 font-medium py-2">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Instagram Connected Successfully
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!allowPermission}
              className={`w-full py-3 rounded-lg transition duration-200 ${
                allowPermission
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Sign In as Influencer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
