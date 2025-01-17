import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { UserContext } from "../../providers/UserContext";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";
import axios from "axios";

const TopRatedDestinations = ({ topDestinations, handleDetails }) => {

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

  //===============================pagination============================
  // State to track the current page
  const [currentPage, setCurrentPage] = useState(0);

  // Number of items per page
  const itemsPerPage = 4;

  // Calculate the total number of pages
  const totalPages = Math.ceil(topDestinations.length / itemsPerPage);

  // Get destinations for the current page
  const currentDestinations = topDestinations.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Handlers for navigation buttons
  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
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
      <section className="mb-4">
        <div className="mt-6">
          <div className="flex  leading-tight text-start justify-between px-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 uppercase tracking-wide">
              Top Rating Destinations
            </h2>
            <Link to="/explore" className="mt-4 hover:underline ">
              See More❯❯
            </Link>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="carousel carousel-center gap-4 rounded-box relative  sm:p-6 lg:p-8 ">
          {/* Grid for Destinations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentDestinations.map((destination, index) => (
              <div
                className="relative shadow-lg rounded-lg border overflow-hidden h-80 sm:h-[20rem] md:h-[22rem] lg:h-[25rem] p-3"
                key={index}
              >
                {localStorage.getItem("user_id") && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSavedItem(destination.destination_id);
                    }}
                    className="absolute top-2 right-2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition z-10"
                  >
                    {savedDestinations.includes(destination.destination_id) ? (
                      <IoMdHeart className="text-2xl" />
                    ) : (
                      <IoIosHeartEmpty className="text-2xl" />
                    )}
                  </button>
                )}
                <div className="relative h-full bg-cover bg-center bg-no-repeat carousel-item">
                  <img
                    src={`http://localhost:3000/backend/${destination.destination_image}`}
                    alt={destination.city}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white pb-2 rounded-lg shadow-lg">
                    <div className="flex flex-col sm:flex-row justify-between h-full">
                      <div className="mb-2">
                        <h3 className="text-lg sm:text-xl font-bold">
                          {destination.city}
                        </h3>
                        <p className="text-xs text-gray-300">
                          {destination.country}
                        </p>
                      </div>
                      <div className="mb-4">
                        <span className="flex mt-4 gap-1 px-3 py-1 bg-yellow-500 text-white text-sm font-semibold rounded-lg">
                          <p>from</p>${destination.price}
                        </span>
                      </div>
                    </div>
                    <button
                      className="w-full px-4 py-2 hover:text-black hover:bg-gray-100 rounded-lg border-white border bg-transparent text-white transition duration-200"
                      onClick={() => handleDetails(destination.destination_id)}
                    >
                      View Details
                    </button>
                  </div>
                  <span className="absolute top-4 left-4 bg-white/50 backdrop-blur-md backdrop-saturate-150 border border-gray-200 text-gray-900 text-sm font-semibold px-3 py-1 rounded-md shadow-sm">
                    {destination.category_name}
                  </span>
                  <span className="absolute top-4 right-4 bg-white/50 backdrop-blur-md backdrop-saturate-150 border border-gray-200 text-black text-sm font-semibold px-2 py-1 rounded-md flex items-center">
                    ⭐ {destination.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            className={`absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white rounded-full px-4 py-2 shadow-lg hover:bg-gray-700 ${currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            onClick={handlePrev}
            disabled={currentPage === 0}
          >
            ❮
          </button>
          <button
            className={`absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white rounded-full px-4 py-2 shadow-lg hover:bg-gray-700 ${currentPage === totalPages - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
              }`}
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
          >
            ❯
          </button>
        </div>
      </section>
    </>
  );
};

export default TopRatedDestinations;
