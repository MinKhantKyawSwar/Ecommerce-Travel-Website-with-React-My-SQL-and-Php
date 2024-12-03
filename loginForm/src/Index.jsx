import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import {Link} from 'react-router-dom'

const Index = () => {
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  // Fetch all destinations
  const fetchDestinations = async () => {
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
      console.log(response.data.data)
      if (response.data.status === 1) {
        setSelectedDestination(response.data.data); // Save details of the selected destination
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
    fetchDestinations();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Destinations</h1>
      <ul>
        {destinations.map((destination, index) => (
          <li key={index}>
            <b className="font-medium text-xl">{destination.country}</b>:{" "}
            {destination.description}
            <button
              className="border-2 px-3 py-2 m-2"
              onClick={() => handleDetails(destination.destination_id)}
            >
              Details
            </button>
          </li>
        ))}
      </ul>

      {selectedDestination && (
        <div className="mt-5 p-4 border">
          <h2>Destination Details</h2>
          <p>
            <b>Name:</b> {selectedDestination.destination_name}
          </p>
          <p>
            <b>Country:</b> {selectedDestination.country}
          </p>
          <p>
            <b>Description:</b> {selectedDestination.description}
          </p>
          <p>
            <b>Bookings:</b> {selectedDestination.booking}
          </p>
          <button
            className="border-2 px-3 py-2 m-2"
            onClick={() => setSelectedDestination(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Index