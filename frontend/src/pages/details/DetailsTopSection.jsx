import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";
import { UserContext } from "../../providers/UserContext";

const DetailsTopSection = ({ destination }) => {
  const [savedDestinations, setSavedDestinations] = useState([]);
  const [error, setError] = useState(null);
  const { savedDestinationNoti, updateFavoriteDestinationNoti } = useContext(UserContext);

  const user_id = localStorage.getItem("user_id");

  const savedKey = `favoriteDestination_${user_id}`;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(savedKey) || "[]");
    if (Array.isArray(saved)) {
      setSavedDestinations(saved);
    } else {
      setSavedDestinations([]); // Fallback in case of invalid data
    }
  }, [savedKey]);


  const toggleSavedItem = async (id) => {
    const isSaved = savedDestinations.includes(id);

    if (isSaved) {
      // Remove item
      try {
        const response = await axios.post(
          `http://localhost:3000/backend/removeFavoriteDestinations.php`,
          { user_id, destination_id: id },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.data.status === 1) {

          const updatedSavedDestinations = savedDestinations.filter(
            (dest_id) => dest_id !== id
          );
          setSavedDestinations(updatedSavedDestinations);
          localStorage.setItem(savedKey, updatedSavedDestinations);
          updateFavoriteDestinationNoti(savedDestinationNoti - 1);
          toast.success("Package successfully removed!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });

        } else {
          setError("Failed to remove item");
        }
      } catch (err) {
        setError("Error removing saved destination: " + err.message);
      }
    } else {
      // Add item
      const dest_id = Number(id);
      const userId = Number(user_id);
      const data = {
        destination: dest_id,
        user: userId,
        saved_at: new Date().toLocaleString(),
      };

      try {
        const response = await axios.post(
          `http://localhost:3000/backend/getFavoriteDestinations.php`,
          data,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.data.status === 1) {
          const updatedSavedDestinations = [...savedDestinations, id];
          setSavedDestinations(updatedSavedDestinations);
          localStorage.setItem(savedKey, updatedSavedDestinations);
          updateFavoriteDestinationNoti(Number(savedDestinationNoti) + 1);
          toast.success("Destinations successfully Favorited!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } else if (response.data.status === 2) {
          toast.error("Destinations already Favorited!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } else {
          setError("Item was not saved");
        }
      } catch (err) {
        setError("Error saving package: " + err.message);
      }
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      <div className="p-6 border rounded-lg shadow-md bg-white dark:bg-gray-800">
        <div className="flex justify-between md:flex-row md:items-center md:justify-between">
          <div className="pb-6 border-b md:border-b-0 md:pb-0 md:border-r md:pr-6">
            <p className="text-2xl font-bold text-gray-800">
              {destination.city}
            </p>
            <div className="flex items-center gap-4 mt-2 text-sm justify-center">
              <p className="text-gray-500 flex items-center gap-1">
                <span className="text-yellow-300 text-lg">★</span>
                {destination.rating}
              </p>
              <span className="text-gray-600 flex items-center mt-1">
                <IoLocationSharp /> {destination.country}
              </span>
            </div>
          </div>
          <div className="mr-4 mt-4 md:mt-0">{localStorage.getItem("user_id") && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSavedItem(destination.destination_id);
              }}
              className="absolute top-44 right-16 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition z-10"
            >
              {savedDestinations.includes(destination.destination_id) ? (
                  <IoMdHeart className="text-2xl"/>
              ) : (
                <IoIosHeartEmpty className="text-2xl" />
              )}
            </button>
          )}</div>
        </div>
        <div className="flex flex-col md:flex-row mt-6 gap-6">
          {/* Main Image */}
          <div className="w-full md:w-3/5">
            {destination.destination_image ? (
              <img
                src={`http://localhost:3000/backend/${destination.destination_image}`}
                alt="Destination"
                className="w-full h-full rounded-lg shadow-lg object-cover"
              />
            ) : (
              <p className="text-gray-500 text-center py-10 border rounded-lg">
                No Image Available For Now
              </p>
            )}
          </div>

          {/* Side Images */}
          <div className="flex flex-col md:w-2/5 gap-4">
            {[
              destination.destination_second_image,
              destination.destination_third_image,
              destination.accommodation_image
            ].map((image, index) => (
              <div key={index}>
                {image ? (
                  <img
                    src={`http://localhost:3000/backend/${image}`}
                    alt={`Destination Side ${index + 1}`}
                    className="w-full h-44 rounded-lg shadow-lg object-cover"
                  />
                ) : (
                  <p className="text-gray-500 text-center py-10 border rounded-lg">
                    No Image Available For Now
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsTopSection;
