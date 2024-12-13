import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Packages = ({ destination_id, activeTab }) => {
  const [packages, setPackages] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const findPackage = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/backend/getPackages.php`,
        {
          headers: {
            "Destination-ID": id, // Include id in the headers
          },
        }
      );

      if (response.data.status === 1) {
        setPackages(response.data.data); // Set packages data
      } else {
        setPackages([]); // Clear the packages if no data found
        setError("No packages found for this destination.");
      }
    } catch (err) {
      setError("Failed to fetch packages: " + err.message);
    }
  };

  const handleDetails = async (id) => {
    localStorage.setItem("activeTab", activeTab);
    navigate(`package/${id}`);
  };
  const handleBooking = async (id) => {
    localStorage.removeItem("activeTab", activeTab);
    navigate(`/booking/${id}`);
  };

  const savedItemHandler = async (id) => {
    const user_id = Number(localStorage.getItem("user_id"));

    const data = {
      package: id,
      user: user_id,
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
        // console.log(response);
        alert("successfully saved") 
      } else {
        setError("item does not saved");
      }
    } catch (err) {
      setError("Failed to fetch packages: " + err.message);
    }
  };

  useEffect(() => {
    if (destination_id) {
      findPackage(destination_id); // Call the function when destination_id changes
    }
  }, [destination_id]);

  return (
    <div className=" p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
      {!error && packages.length > 0 ? (
        <>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {packages.length} packages Available
          </p>
          <div className="flex gap-10">
            {packages.map((pkg, index) => (
              <div
                key={pkg.package_id}
                className="border rounded-lg p-4 shadow-md w-full md:w-1/3"
              >
                <button
                  onClick={() => savedItemHandler(pkg.package_id)}
                  className={`mb-2 px-4 py-2 rounded ${
                    isSaved
                      ? "bg-green-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {isSaved ? "Saved" : "Save"}
                </button>
                <p className="font-medium text-xl mb-2">
                  {index + 1}. {pkg.package_name}
                </p>
                <p className="text-sm mb-4">
                  <b>Price:</b> ${pkg.price}
                  <br />
                  <b>Facilities:</b> {pkg.facilities}
                  <br />
                  <b>Meals:</b> {pkg.meals}
                  <br />
                  <b>Activities:</b> {pkg.activities}
                  <br />
                  <b>Duration:</b> {pkg.duration}
                </p>
                <div className="flex justify-between">
                  <button
                    className="border-2 border-blue-500 text-blue-500 px-3 py-2 rounded hover:bg-blue-500 hover:text-white transition"
                    onClick={() => {handleDetails(pkg.package_id)}}
                  >
                    Check More
                  </button>
                  <button
                    className="border-2 border-green-500 text-green-500 px-3 py-2 rounded hover:bg-green-500 hover:text-white transition"
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
          <p className="text-red-500">
            No packages available for this destination.
          </p>
        )
      )}
    </div>
  );
};

export default Packages;
