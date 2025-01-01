import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

const Packages = ({ destination_id, activeTab, packages, setPackages }) => {
  const [error, setError] = useState(null);
  const [savedPackages, setSavedPackages] = useState({}); // Track saved state for each package

  const navigate = useNavigate();

  const findPackage = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/backend/getPackages.php`,
        {
          headers: {
            "Destination-ID": id,
          },
        }
      );

      if (response.data.status === 1) {
        setPackages(response.data.data);
        console.log(response.data.data);
      } else {
        setPackages([]);
        setError("No packages found for this destination.");
      }
    } catch (err) {
      setError("Failed to fetch packages: " + err.message);
    }
  };

  const handleDetails = (id) => {
    localStorage.setItem("activeTab", activeTab);
    navigate(`package/${id}`);
  };

  const handleBooking = (id) => {
    if (localStorage.getItem("token")) {
      navigate(`/booking/${id}`);
    } else {
      navigate("/register");
    }
  };

  const savedItemHandler = async (id, least_price) => {
    const user_id = Number(localStorage.getItem("user_id"));
    const data = {
      package: id,
      user: user_id,
      least_price: least_price,
      saved_at: new Date().toLocaleString(),
    };

    try {
      const response = await axios.post(
        `http://localhost:3000/backend/getSavedPackages.php`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === 1) {
        alert("Successfully saved");
        setSavedPackages((prevState) => ({
          ...prevState,
          [id]: true, // Mark this package as saved
        }));
      } else if (response.data.status === 2) {
        alert("This package is already saved.");
      } else {
        setError("Item was not saved");
      }
    } catch (err) {
      setError("Failed to save package: " + err.message);
    }
  };

  useEffect(() => {
    if (destination_id) {
      findPackage(destination_id); // Call the function when destination_id changes
    }
  }, [destination_id]);

  return (
    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 mb-10">
      {!error && packages.length > 0 ? (
        <>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            {packages.length} packages available
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.package_id}
                className="relative border rounded-lg p-6 shadow-lg bg-white dark:bg-gray-700 hover:shadow-xl transition-shadow duration-300"
              >
                <button
                  onClick={() =>
                    savedItemHandler(pkg.package_id, pkg.least_price)
                  }
                  className="absolute top-2 right-2 py-6 px-6 rounded-full text-lg text-gray-500 dark:text-gray-300 hover:text-blue-500"
                >
                  {savedPackages[pkg.package_id] ? (
                    <FaBookmark />
                  ) : (
                    <FaRegBookmark />
                  )}
                </button>

                <div className="flex justify-center">
                  <p className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-2">
                    {pkg.package_name}
                  </p>
                </div>
                <p className="text-md text-gray-600 dark:text-gray-400 mb-2">
                  From <b>${pkg.least_price}</b>/person
                  for <b>{pkg.duration}</b> Days
                </p>

                <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
                  <b>Facilities:</b> {pkg.facilities}
                  <br />
                  <b>Meals:</b> {pkg.meals.substring(0, 40)}...
                  <br />
                </p>
                <div className="flex justify-between">
                  <button
                    className="border-2 border-gray-800 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 hover:text-white transition"
                    onClick={() => handleDetails(pkg.package_id)}
                  >
                    Check More
                  </button>
                  <button
                    className="border-2 border-gray-800 hover:bg-transparent hover:text-gray-800 px-4 py-2 rounded-lg text-sm font-medium bg-gray-900 text-white transition"
                    onClick={() => handleBooking(pkg.package_id)}
                  >
                    Book Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        !error && (
          <p className="text-center text-red-500">
            No packages available for this destination.
          </p>
        )
      )}
    </div>
  );
};

export default Packages;
