import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Details = () => {
  const [destination, setDestination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const{ id }= useParams();

      // Fetch details of a single destination
  const findById = async () => {
    try {
      // setLoading(true); // Show loading for details
      const response = await axios.get(
        `http://localhost:3000/backend/getDestination.php?id=${id}`
      );

      if (response.data.status === 1) {
         // Save details of the selected destination
         setDestination(response.data.data);
      } else {
        setError("No details found for this destination");
      }
    } catch (err) {
      setError("Failed to fetch details: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect((_)=>{
    findById();
  },[id])

  return (
    <>
        <div className="mt-5 p-4 border">
          <h2>Destination Details</h2>
          <p>
            <b>Name:</b> {destination.destination_name}
          </p>
          <p>
            <b>Country:</b> {destination.country}
          </p>
          <p>
            <b>Description:</b> {destination.description}
          </p>
          <p>
            <b>Bookings:</b> {destination.booking}
          </p>
          <img src={destination.destination_image_path} style='width: 50px; height: 80px;'></img>
          <button
            className="border-2 px-3 py-2 m-2"
            onClick={() => navigate(-1)}
          >
            Close
          </button>
        </div>
      </>
  )
}

export default Details