import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SavedPackages = () => {
  const [error, setError] = useState(null);
  const [savedItem, setSavedItem] = useState([]);

  const navigate = useNavigate();

  const getSavedItem = async (user_id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/backend/getSavedPackages.php`,
        {
          headers: {
            "User-Id": user_id,
          },
        }
      );

      if (response.data.status === 1) {
        setSavedItem(response.data.data);
      } else {
        setError("Item does not saved");
      }
    } catch (err) {
      setError("Failed to fetch packages: " + err.message);
    }
  };
  const handleBooking = async (id) => {
    navigate(`/booking/${id}`);
  };

  let user_id = localStorage.getItem("user_id");
  useEffect(() => {
    getSavedItem(user_id);
  }, []);

  return (
    <div>
      <div className="text-lg font-bold">Saved Packages</div>

      {savedItem.length > 0 ? (
        savedItem.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row border border-gray-300 rounded-lg shadow-md m-2 p-4"
          >
            {/* Image Section */}
            {item.destination_image && (
              <img
                src={`http://localhost:3000/backend/${item.destination_image}`}
                alt={item.package_name}
                className="w-full md:w-56 h-32 md:h-auto object-cover rounded-lg mb-4 md:mb-0 md:mr-4"
              />
            )}

            {/* Content Section */}
            <div className="flex-grow">
              <h1 className="text-xl font-semibold">{item.destination_name}</h1>
              <h3 className="text-lg font-light text-gray-700">
                {item.package_name}
              </h3>
              <p className="mt-4 text-lg font-bold text-green-600">
                Price: ${item.price}
              </p>
            </div>

            {/* Actions Section */}
            <div className="flex flex-col justify-between mt-4 md:mt-0 md:items-end">
              <p className="text-gray-400 mb-4">
                <span className="font-medium">Saved At:</span> {item.saved_at}
              </p>
              <div className="flex space-x-2">
                <button className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 transition duration-200"
                  onClick={(_)=> handleBooking(item.package)}>
                  Order
                </button>
                <button className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 transition duration-200">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No saved items.</p>
      )}
    </div>
  );
};

export default SavedPackages;
