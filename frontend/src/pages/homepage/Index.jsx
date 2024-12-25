import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Index = () => {
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch all destinations
  const getDestinations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getDestination.php"
      );

      if (response.data.status === 1) {
        setDestinations(response.data.data);
      } else {
        setError("No data found");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch details of a single destination
  const handleDetails = async (id) => {
    try {
      setLoading(true); // Show loading for details
      const response = await axios.get(
        `http://localhost:3000/backend/getDestination.php?id=${id}`
      );

      if (response.data.status === 1) {
        setSelectedDestination(response.data.data); // Save details of the selected destination
        navigate(`/destination/${id}`);
      } else {
        setError("No details found for this destination");
      }
    } catch (err) {
      setError("Failed to fetch details: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDestinations();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-blue-600">Explore the World</h1>
          <p className="text-lg text-gray-700 mt-4">Find the best destinations and plan your next adventure.</p>
        </header>
        <h2 className="text-3xl font-bold text-center mb-8">Popular Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <div className="bg-white shadow-md rounded-lg overflow-hidden" key={index}>
              <img
                src={`http://localhost:3000/backend/${destination.destination_image}` || 'default-image.jpg'}
                alt={destination.destination_name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-2xl font-semibold mb-2 text-blue-600">{destination.destination_name}</h3>
                <p className="text-gray-600 mb-1 font-medium">{destination.country}</p>
                <p className="text-gray-500 mb-4 text-sm">{destination.description}</p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  onClick={() => handleDetails(destination.destination_id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedDestination && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
              <h2 className="text-2xl font-bold mb-4">Destination Details</h2>
              <p className="mb-2">
                <b>Name:</b> {selectedDestination.destination_name}
              </p>
              <p className="mb-2">
                <b>Country:</b> {selectedDestination.country}
              </p>
              <p className="mb-2">
                <b>Description:</b> {selectedDestination.description}
              </p>
              <p className="mb-4">
                <b>Bookings:</b> {selectedDestination.booking}
              </p>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={() => setSelectedDestination(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className="bg-blue-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">&copy; 2024 Travel App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;