import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

// require("../../../backend/pictures/destination_image/Los_Angeles.jpg")

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
        <button
            className="border-2 px-3 py-2 m-2"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        <div className="mt-5 p-4 border flex">
          {destination.destination_image ?
        <img src={`/${destination.destination_image}`} alt='img' width={600}/>
       
          : <p>No Image Available For now</p>
          }
          <div>
          <h2 className='text-2xl font-medium underline'>Destination Details</h2>
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

          
          </div>
        </div>
      </>
  )
}

export default Details