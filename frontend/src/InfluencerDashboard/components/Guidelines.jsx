import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';

const Guidelines = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [campaignData, setCampaignData] = useState(null);

  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const response = await axios.get(`/api/campaigns/${campaignId}`);
        setCampaignData(response.data);
      } catch (error) {
        console.error('Error fetching campaign data:', error);
      }
    };

    fetchCampaignData();
  }, [campaignId]);

  if (!campaignData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 text-xl font-semibold text-gray-600">
        Loading campaign guidelines...
      </div>
    );
  }

  const handleDownloadImage = async (imageUrl) => {
    try {
      const response = await axios.get(imageUrl, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `campaign_image_${Date.now()}.jpg`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-8">
      <div className="relative max-w-5xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-2xl transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl z-0"></div>

        <div className="relative bg-white shadow-2xl rounded-3xl p-6 sm:p-12 z-10">
          <div className="flex items-center mb-6">
            <button onClick={() => navigate(-1)} className="mr-4 p-2 rounded-full hover:bg-gray-200">
              <ArrowLeft className="h-6 w-6 text-gray-700" />
            </button>
            <h2 className="text-3xl font-bold text-gray-900">Campaign Guidelines</h2>
          </div>

          {campaignData.images?.length > 0 && (
            <section className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Images</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaignData.images.map((imageUrl, index) => (
                  <div key={index} className="border rounded-lg p-2 bg-gray-50">
                    <img
                      src={imageUrl}
                      alt={`Campaign Image ${index + 1}`}
                      className="w-full h-48 object-cover rounded-md mb-2"
                    />
                    <button
                      onClick={() => handleDownloadImage(imageUrl)}
                      className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded"
                    >
                      Download Image
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {campaignData.hashtags?.length > 0 && (
            <section className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Hashtags</h3>
              <p className="text-gray-700">{campaignData.hashtags.join(', ')}</p>
            </section>
          )}

          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">General Guidelines</h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-1 mb-4">
              <li>Upload the provided media sequentially in your story.</li>
              <li>Add the provided hashtags to your story.</li>
              <li>Ensure the story remains visible for 24 hours.</li>
            </ol>
            <p className="text-gray-700 font-medium">Upon successful completion of the campaign, your payment will be initiated.</p>
          </section>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const storyLink = e.target.elements.storyLink.value;
              console.log('Submitted Story Link:', storyLink);
            }}
            className="mb-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Submit Story Link</h3>
            <div className="mb-4">
              <label htmlFor="storyLink" className="block text-gray-700 text-sm font-medium mb-1">
                Submit the url of your Instagram Story
              </label>
              <input
                type="url"
                name="storyLink"
                id="storyLink"
                className="w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your story link"
                required
              />
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md">
              Submit Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;