import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopLocations from "./TopLocations";

const Index = () => {
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getDestinations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getIndexInfo.php"
      );

      if (response.data.status === 1) {
        const destinations = response.data.data;

        // Shuffle the array to get random items
        const shuffledDestinations = destinations.sort(
          () => 0.5 - Math.random()
        );

        // Filter to get unique destination IDs
        const uniqueDestinations = [];
        const destinationIds = new Set();

        for (let destination of shuffledDestinations) {
          if (!destinationIds.has(destination.destination_id)) {
            uniqueDestinations.push(destination);
            destinationIds.add(destination.destination_id);
          }

          // Stop once we have 4 unique destinations
          if (uniqueDestinations.length === 4) break;
        }

        // Set the random destinations
        setDestinations(uniqueDestinations);
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
    <>
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <header className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-blue-600">
              Explore the World
            </h1>
            <p className="text-lg text-gray-700 mt-4">
              Find the best destinations and plan your next adventure.
            </p>
          </header>

          <h2 className="text-3xl font-bold text-center mb-8">
            Available Destinations
          </h2>
          <div>
            <TopLocations />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 h-full lg:grid-cols-4 gap-4 carousel rounded-box">
            {destinations.map((destination, index) => (
              <div
                className="relative bg-white rounded-lg border overflow-hidden shadow-lg md:h-80 h-72 w-full sm:w-80 lg:w-64"
                key={index}
              >
                {/* Destination Image with Overlay Text */}
                <div className="relative h-72 bg-cover bg-center bg-no-repeat">
                  <img
                    src={`http://localhost:3000/backend/${destination.destination_image}`}
                    alt={destination.city}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                  {/* Text Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white pb-2 rounded-lg shadow-lg">
                    <div className="flex flex-row justify-between h-full">
                      {/* City and Country */}
                      <div className="mb-2">
                        <h3 className="text-lg font-bold">
                          {destination.city}
                        </h3>
                        <p className="text-xs text-gray-300">
                          {destination.country}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="mb-4">
                        <span className="flex mt-4 gap-1 px-3 py-1 bg-yellow-500 text-white text-sm font-semibold rounded-lg">
                          <p>from</p>${destination.price}
                        </span>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <button
                      className="w-full px-4 py-2 hover:text-black hover:bg-gray-100 rounded-lg border-white border bg-transparent text-white transition duration-200"
                      onClick={() => handleDetails(destination.destination_id)}
                    >
                      View Details
                    </button>
                  </div>

                  {/* Category Label */}
                  <span className="absolute top-4 left-4 bg-white/50 backdrop-blur-md backdrop-saturate-150 border border-gray-200 text-gray-900 text-sm font-semibold px-3 py-1 rounded-md shadow-sm">
                    {destination.category_name}
                  </span>

                  {/* Rating Badge */}
                  <span className="absolute top-4 right-4 bg-white/50 backdrop-blur-md backdrop-saturate-150 border border-gray-200 text-black text-sm font-semibold px-2 py-1 rounded-md flex items-center">
                    ⭐ {destination.rating}
                  </span>
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
                  <b>Description:</b> {selectedDestination.description.substring(0, 32)}...
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
      </div>
    </>
  );
};

export default Index;
