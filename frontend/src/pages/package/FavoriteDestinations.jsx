import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";

const SavedDestinations = () => {
  const [error, setError] = useState(null);
  const [savedItem, setSavedItem] = useState([]);
  
  const navigate = useNavigate();

  const getFavoriteDestination = async (user_id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/backend/getFavoriteDestinations.php`,
        {
          headers: {
            "User-Id": user_id,
          },
        }
      );

      if (response.data.status === 1) {
        setSavedItem(response.data.data);
      } else {
        setError("Destination does not favorited.");
      }
    } catch (err) {
      setError("Failed to fetch packages: " + err.message);
    }
  };

  const deleteSavedItem = async (savedItemId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/backend/getFavoriteDestinations.php`,
        {
          headers: {
            "Saved-Destination-Id": savedItemId,
          },
        }
      );

      if (response.data.status === 1) {
        toast.success("Destination successfully removed!", {
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
        setTimeout(() => navigate(0), 1000);

        setSavedItem((prevItems) =>
          prevItems.filter((item) => item.saved_id !== savedItemId)
        );
      } else {
        setError("Item does not saved");
      }
    } catch (err) {
      setError("Failed to fetch packages: " + err.message);
    }
  };

  const handleBooking = async (id, index) => {
    navigate(`/booking/${id}`);
  };

  let user_id = localStorage.getItem("user_id");
  useEffect(() => {
    getFavoriteDestination(user_id);
  }, []);

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
      <div className="container mx-auto p-4 mb-10 mt-10 min-h-96">
        <div className="text-lg font-bold mb-4">Favorite Destinations</div>

        {savedItem.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {savedItem.map((item, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg shadow-md p-4 flex flex-col"
              >
                {/* Image Section */}
                {item.destination_image && (
                  <img
                    src={`http://localhost:3000/backend/${item.destination_image}`}
                    alt={item.package_name}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                )}

                {/* Content Section */}
                <div className="flex-grow">
                  <h1 className="text-xl font-semibold">
                    {item.destination_name}
                  </h1>
                  <h3 className="text-lg font-light text-gray-700">
                    {item.destination_name}
                  </h3>
                </div>

                {/* Actions Section */}
                <div className="flex flex-col justify-between mt-4">
                  <p className="text-gray-400 mb-4">
                    <span className="font-medium">Saved At:</span>{" "}
                    {item.saved_at}
                  </p>
                  <div className="flex space-x-2 justify-between">
                    <button
                      className="bg-green-500 text-white rounded-lg px-8 py-2 hover:bg-green-600 transition duration-200"
                      onClick={(_) => handleBooking(item.package, index)}
                    >
                      Details
                    </button>
                    <button
                      className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 transition duration-200"
                      onClick={(_) => deleteSavedItem(item.favorite_destination_id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No favorite items.</p>
        )}
      </div>
    </>
  );
};

export default SavedDestinations;
