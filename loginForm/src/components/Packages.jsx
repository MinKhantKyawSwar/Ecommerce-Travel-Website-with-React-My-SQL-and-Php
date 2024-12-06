import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Packages = ({ destination_id, activeTab }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    if (destination_id) {
      findPackage(destination_id); // Call the function when destination_id changes
    }
  }, [destination_id]);

  return (
    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
      {error && <p className="text-red-500">{error}</p>}
      {!error && packages.length > 0 ? (
        <>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {packages.length} packages Available
          </p>
          <div className="flex items-start gap-20">
            {packages.map((pkg, index) => (
              <div key={pkg.package_id}>
                <p className="font-medium text-2xl">
                  <br />
                  {index + 1}. {pkg.package_name}
                  <br />
                </p>
                <p className="text-sm">
                  <b>Price:</b> ${pkg.price}
                  <br />
                  <b>Facilities:</b> {pkg.facilities}
                  <br />
                  <b>Meals:</b> {pkg.meals}
                  <br />
                  <b>Activities:</b> {pkg.activities}
                  <br />
                  <b>Duration:</b> {pkg.duration}
                  <br />
                  <button
                    className="border-2 px-3 py-2 m-2"
                    onClick={() => handleDetails(pkg.package_id)}
                  >
                    Check More
                  </button>
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        !error && <p>No packages available for this destination.</p>
      )}
    </div>
  );
};

export default Packages;
