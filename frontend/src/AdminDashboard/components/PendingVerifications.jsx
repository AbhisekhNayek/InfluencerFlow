import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PendingVerifications() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPendingBrands = async () => {
    try {
      const token = localStorage.getItem('token');
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

      const res = await axios.get(`${apiBaseUrl}/api/brands/pending`, {
        headers: {
          'x-auth-token': token,
        }
      });
      setBrands(res.data);
    } catch (err) {
      console.error('Error fetching pending brands:', err);
      setError('Failed to load pending verifications');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('token');

      await axios.put(`${apiBaseUrl}/api/brands/approve/${id}`, {}, {
        headers: { 'x-auth-token': token },
      });
      setBrands((prev) => prev.filter((brand) => brand._id !== id));
    } catch (err) {
      console.error('Error approving brand:', err);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem('token');
       await axios.delete(`${apiBaseUrl}/api/brands/reject/${id}`, {
        headers: {'x-auth-token': token},
      });
      setBrands((prev) => prev.filter((brand) => brand._id !== id));
    } catch (err) {
      console.error('Error rejecting brand:', err);
    }
  };

  useEffect(() => {
    fetchPendingBrands();
  }, []);

  if (loading) return <div>Loading pending verifications...</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Pending Verifications</h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {brands.length === 0 ? (
        <p className="text-gray-500">No pending verifications.</p>
      ) : (
        <ul className="space-y-4">
          {brands.map((brand) => (
            <li key={brand._id} className="border border-gray-300 rounded-lg p-4 flex justify-between items-center">
              <div className="flex-grow space-y-1">
                <p className="font-bold text-lg">{brand.businessName}</p>
                <p><span className="font-semibold">Email:</span> {brand.user?.email}</p>
                <p><span className="font-semibold">Category:</span> {brand.category}</p>
                {brand.website && <p><span className="font-semibold">Website:</span> {brand.website}</p>}
                {brand.description && <p><span className="font-semibold">Description:</span> {brand.description}</p>}
              </div>
              <div className="flex flex-col space-y-2">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                  onClick={() => handleApprove(brand._id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                  onClick={() => handleReject(brand._id)}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PendingVerifications;
