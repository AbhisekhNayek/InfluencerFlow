import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;


const LaunchCampaign = () => {
  // Categories list
  const categories = [
    "Fashion & Style", "Beauty & Makeup", "Travel & Adventure", "Fitness & Health",
    "Food & Cooking", "Technology & Gadgets", "Gaming", "Education & Learning",
    "Entertainment & Comedy", "Business & Entrepreneurship", "Lifestyle", "Other"
  ];

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    campaignName: '',
    category: '',
    budget: '',
    minFollowers: '',
    productDescription: '',
    ecommLink: '',
    isLocationSpecific: 'no',
    location: {
      country: '',
      state: '',
      district: '',
      pincode: ''
    },
    campaignRange: '', 
  });
  
  const [mediaItems, setMediaItems] = useState([]);
  const [products, setProducts] = useState([{ name: '', price: '' }]);
  const [hashtags, setHashtags] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('location.')) {
      const locationField = name.split('.')[1];
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [locationField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleFileChange = (e, mediaType) => {
    const file = e.target.files[0];
    
    if (!file) return;
    const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB in bytes
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`File too large. Maximum file size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
      return;
    }
    if (mediaItems.length >= 5) {
      toast.error('Maximum 5 media files allowed');
      return;
    }
    
    // Validate file type
    if (mediaType === 'Image' && !file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    
    if (mediaType === 'Video' && !file.type.startsWith('video/')) {
      toast.error('Please upload a video file');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const newMediaItem = {
        file: file,
        preview: e.target.result,
        type: mediaType.toLowerCase(),
        name: file.name
      };
      
      setMediaItems(prevItems => [...prevItems, newMediaItem]);
    };
    reader.readAsDataURL(file);
    
    e.target.value = '';
  };

  const handleRemoveMedia = (index) => {
    setMediaItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const handleHashtagsChange = (e) => {
    setHashtags(e.target.value);
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...products];
    updatedProducts[index][name] = value;
    setProducts(updatedProducts);
  };

  const addProduct = () => {
    setProducts([...products, { name: '', price: '' }]);
  };

  const removeProduct = (index) => {
    if (products.length > 1) {
      const updatedProducts = [...products];
      updatedProducts.splice(index, 1);
      setProducts(updatedProducts);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.campaignName) newErrors.campaignName = 'Campaign name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.budget) newErrors.budget = 'Budget is required';
    if (!formData.productDescription) newErrors.productDescription = 'Product description is required';
    if (!formData.minFollowers) newErrors.minFollowers = 'Minimum followers is required';
    if (!formData.isLocationSpecific) newErrors.isLocationSpecific = 'Location specificity is required';
    
    if (formData.isLocationSpecific === 'yes') {
      if (!formData.location.country) newErrors['location.country'] = 'Country is required';
      if (!formData.location.state) newErrors['location.state'] = 'State is required';
      if (!formData.location.district) newErrors['location.district'] = 'District is required';
      if (!formData.location.pincode) newErrors['location.pincode'] = 'Pincode is required';
    }

    if (!formData.campaignRange) newErrors.campaignRange = 'Please select a campaign range';

    if (mediaItems.length === 0) newErrors.media = 'At least one media file is required';
    
    products.forEach((product, index) => {
      if (product.price && parseFloat(product.price) < 0) {
        newErrors[`product${index}Price`] = 'Price cannot be negative';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    try {
      setLoading(true);
      
      const formDataForSubmit = new FormData();
      
      formDataForSubmit.append('campaignName', formData.campaignName);
      formDataForSubmit.append('category', formData.category);
      formDataF
      orSubmit.append('budget', formData.budget);
      formDataForSubmit.append('minFollowers', formData.minFollowers);
      formDataForSubmit.append('productDescription', formData.productDescription);
      formDataForSubmit.append('ecommLink', formData.ecommLink);
      formDataForSubmit.append('isLocationSpecific', formData.isLocationSpecific);
      
      if (formData.isLocationSpecific === 'yes') {
        formDataForSubmit.append('location', JSON.stringify(formData.location));
      }

      formDataForSubmit.append('campaignRange', formData.campaignRange);

      formDataForSubmit.append('hashtags', hashtags);
      formDataForSubmit.append('products', JSON.stringify(products));
      
      const mediaTypesInfo = mediaItems.map(item => ({
        type: item.type
      }));
      formDataForSubmit.append('mediaInfo', JSON.stringify(mediaTypesInfo));
      
      mediaItems.forEach((item) => {
        formDataForSubmit.append('media', item.file);
      });
      
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Authentication required. Please login again.');
        setLoading(false);
        return;
      }
      
      const response = await axios.post(`${apiBaseUrl}/api/brands/launchCampaign`,
        formDataForSubmit,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-auth-token': localStorage.getItem('token')
          }
        }
      );
      
      toast.success('Campaign created successfully!');
      
      setFormData({
        campaignName: '',
        category: '',
        budget: '',
        minFollowers: '',
        productDescription: '',
        ecommLink: '',
        isLocationSpecific: 'no',
        location: {
          country: '',
          state: '',
          district: '',
          pincode: ''
        },
        campaignRange: '', 
      });
      setMediaItems([]);
      setProducts([{ name: '', price: '' }]);
      setHashtags('');
      
    } catch (error) {
      console.error('Campaign creation error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create campaign';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6">Launch New Campaign</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Campaign Name */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="campaignName">
              Campaign Name*
            </label>
            <input
              type="text"
              id="campaignName"
              name="campaignName"
              value={formData.campaignName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white"
              aria-describedby="campaignName-error"
              required
            />
            {errors.campaignName && <p id="campaignName-error" className="text-sm text-red-500">{errors.campaignName}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="category">
              Category*
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white"
              aria-describedby="category-error"
              required
            >
              <option value="">Select your category</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p id="category-error" className="text-sm text-red-500">{errors.category}</p>}
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="budget">
              Budget*
            </label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white"
              aria-describedby="budget-error"
              placeholder="Enter campaign budget"
              required
            />
            {errors.budget && <p id="budget-error" className="text-sm text-red-500">{errors.budget}</p>}
          </div>

          {/* Min Followers */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="minFollowers">
              Minimum Followers*
            </label>
            <input
              type="number"
              id="minFollowers"
              name="minFollowers"
              value={formData.minFollowers}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white"
              aria-describedby="minFollowers-error"
              placeholder="Enter minimum followers count"
              min="0"
              required
            />
            {errors.minFollowers && <p id="minFollowers-error" className="text-sm text-red-500">{errors.minFollowers}</p>}
          </div>
        </div>

        {/* E-commerce Link */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="ecommLink">
            E-commerce Link (if any)
          </label>
          <input
            type="url"
            id="ecommLink"
            name="ecommLink"
            value={formData.ecommLink}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white"
            placeholder="https://example.com/product"
          />
        </div>

        {/* Location Specific Field */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Is this campaign location specific?*
          </label>
          <div className="flex space-x-4 mt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="isLocationSpecific"
                value="yes"
                checked={formData.isLocationSpecific === 'yes'}
                onChange={handleChange}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="isLocationSpecific"
                value="no"
                checked={formData.isLocationSpecific === 'no'}
                onChange={handleChange}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">No</span>
            </label>
          </div>
          {errors.isLocationSpecific && <p className="text-sm text-red-500 mt-1">{errors.isLocationSpecific}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="campaignRange">
            Select Campaign Range*
            </label>
            <select
              name="campaignRange"
              id="campaignRange"
              value={formData.campaignRange}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white"
              aria-describedby="campaignRange-error bg-white"
              required
            >
              <option value="">Select campaign range</option>
              <option value="local">Local - Within your city</option>
              <option value="regional">Regional - Within your District</option>
            </select>
            {errors.campaignRange && (
              <p id="campaignRange-error" className="text-sm text-red-500">
                {errors.campaignRange}
              </p>
            )}
          </div>        




        {/* Location Fields */}
        {formData.isLocationSpecific === 'yes' && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Location Details*</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="location.country">
                  Country*
                </label>
                <input
                  type="text"
                  id="location.country"
                  name="location.country"
                  value={formData.location.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white"
                  aria-describedby="country-error"
                  required
                />
                {errors['location.country'] && <p id="country-error" className="text-sm text-red-500">{errors['location.country']}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="location.state">
                  State*
                </label>
                <input
                  type="text"
                  id="location.state"
                  name="location.state"
                  value={formData.location.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white"
                  aria-describedby="state-error"
                  required
                />
                {errors['location.state'] && <p id="state-error" className="text-sm text-red-500">{errors['location.state']}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="location.district">
                  District*
                </label>
                <input
                  type="text"
                  id="location.district"
                  name="location.district"
                  value={formData.location.district}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white"
                  aria-describedby="district-error"
                  required
                />
                {errors['location.district'] && <p id="district-error" className="text-sm text-red-500">{errors['location.district']}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="location.pincode">
                  Pincode*
                </label>
                <input
                  type="text"
                  id="location.pincode"
                  name="location.pincode"
                  value={formData.location.pincode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white"
                  aria-describedby="pincode-error"
                  required
                />
                {errors['location.pincode'] && <p id="pincode-error" className="text-sm text-red-500">{errors['location.pincode']}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Media Upload Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Media Files* (Min 1, Max 5)</h3>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">
              {mediaItems.length}/5 files added
            </span>
            
            {mediaItems.length < 5 && (
              <div className="flex space-x-4">
                {/* Image Upload */}
                <div>
                  <input
                    type="file"
                    id="imageUpload"
                    onChange={(e) => handleFileChange(e, 'Image')}
                    className="hidden"
                    accept="image/*"
                  />
                  <label 
                    htmlFor="imageUpload" 
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    Add Image
                  </label>
                </div>
                
                {/* Video Upload */}
                <div>
                  <input
                    type="file"
                    id="videoUpload"
                    onChange={(e) => handleFileChange(e, 'Video')}
                    className="hidden"
                    accept="video/*"
                  />
                  <label 
                    htmlFor="videoUpload" 
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                  >
                    Add Video
                  </label>
                </div>
              </div>
            )}
          </div>
          
          {errors.media && <p className="text-sm text-red-500 mb-4">{errors.media}</p>}
          
          {/* Media Items Grid */}
          {mediaItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {mediaItems.map((item, index) => (
                <div key={index} className="border rounded-md overflow-hidden bg-white">
                  <div className="h-40 bg-gray-100 relative">
                    {item.type === 'image' ? (
                      <img src={item.preview} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <video src={item.preview} className="h-full max-w-full" controls />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
                      {item.type}
                    </div>
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <div className="text-sm truncate max-w-xs">{item.name}</div>
                    <button 
                      type="button"
                      onClick={() => handleRemoveMedia(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p className="mt-2 text-sm text-gray-600">No media files added yet</p>
              <p className="text-xs text-gray-500">Click 'Add Image' or 'Add Video' to upload files</p>
            </div>
          )}
        </div>

        {/* Product Description */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="productDescription">
            Product Description*
          </label>
          <textarea
            id="productDescription"
            name="productDescription"
            value={formData.productDescription}
            onChange={handleChange}
            rows={4} 
            className="w-full px-4 py-3 rounded-lg border border-gray-300"
            aria-describedby="description-error"
            required
          />
          {errors.productDescription && <p id="description-error" className="text-sm text-red-500">{errors.productDescription}</p>}
        </div>

        {/* Hashtags */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="hashtags">
            Hashtags (comma-separated)
          </label>
          <input
            type="text"
            id="hashtags"
            value={hashtags}
            onChange={handleHashtagsChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white"
            placeholder="#brandname, #campaign, #product"
          />
        </div>

        {/* Products */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Products</h3>
          {products.map((product, index) => (
            <div key={index} className="flex space-x-4 items-center mb-3">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={product.name}
                onChange={(e) => handleProductChange(index, e)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={product.price}
                onChange={(e) => handleProductChange(index, e)} bg-white
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                min="0"
              />
              {errors[`product${index}Price`] && <p className="text-sm text-red-500">{errors[`product${index}Price`]}</p>}
              {products.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProduct(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addProduct}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Product
          </button>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-3 text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Creating Campaign...' : 'Launch Campaign'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LaunchCampaign;