import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { UserContext } from "../../providers/UserContext";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";

const Packages = ({ destination_id, packages, setPackages }) => {

  const [error, setError] = useState(null);
  const [savedPackages, setSavedPackages] = useState([]);
  const navigate = useNavigate();
  const { savedNoti, updateSavedNoti } = useContext(UserContext);

  const user_id = localStorage.getItem("user_id");
  const savedKey = `savedPackages_${user_id}`; // User-specific key for saved packages

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(savedKey) || "[]");
    if (Array.isArray(saved)) {
      setSavedPackages(saved);
    } else {
      setSavedPackages([]); // Fallback in case of invalid data
    }
  }, [savedKey]);

  const findPackage = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/backend/getPackages.php`,
        {
          headers: { "Destination-ID": id },
        }
      );

      if (response.data.status === 1) {
        setPackages(response.data.data);
      } else {
        setPackages([]);
        setError("No packages found for this destination.");
      }
    } catch (err) {
      setError("Failed to fetch packages: " + err.message);
    }
  };

  const toggleSavedItem = async (id, least_price) => {
    const isSaved = savedPackages.includes(id);

    if (isSaved) {
      // Remove item
      try {
        const response = await axios.post(
          `http://localhost:3000/backend/removeSavedPackage.php`,
          { user_id, package_id: id },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.data.status === 1) {
          const updatedSavedPackages = savedPackages.filter(
            (pkgId) => pkgId !== id
          );
          setSavedPackages(updatedSavedPackages);
          localStorage.setItem(savedKey, updatedSavedPackages);
          updateSavedNoti(savedNoti - 1);
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
        setError("Error removing saved package: " + err.message);
      }
    } else {
      // Add item
      const data = {
        package: id,
        user: user_id,
        least_price,
        saved_at: new Date().toLocaleString(),
      };

      try {
        const response = await axios.post(
          `http://localhost:3000/backend/getSavedPackages.php`,
          data,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.data.status === 1) {
          const updatedSavedPackages = [...savedPackages, id];
          setSavedPackages(updatedSavedPackages);
          localStorage.setItem(savedKey, updatedSavedPackages);
          updateSavedNoti(Number(savedNoti) + 1);
          toast.success("Package successfully saved!", {
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
          toast.error("Package already saved!", {
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

  useEffect(() => {
    if (destination_id) {
      findPackage(destination_id);
    }
  }, [destination_id]);

  const handleDetails = (id) => {
    navigate(`package/${id}`);
  };

  const handleBooking = (id) => {
    if (localStorage.getItem("user_id")) {
      navigate(`/booking/${id}`);
    } else {
      navigate(`/register`)
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
      <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 mb-10">
        {!error && packages.length > 0 ? (
          <>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {packages.length} packages available
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.package_id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:border hover:border-black transition-shadow duration-300"
                >
                  <div className="p-5">
                    {/* Package Name and Bookmark */}
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                        {pkg.package_name}
                      </h3>
                      {localStorage.getItem("user_id") && (
                        <button
                          onClick={() =>
                            toggleSavedItem(pkg.package_id, pkg.least_price)
                          }
                          className="text-xl text-gray-500 hover:text-gray-800"
                        >
                          {savedPackages.includes(pkg.package_id) ? (
                            <FaBookmark />
                          ) : (
                            <FaRegBookmark />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Package Details */}
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      <span className="block">
                        <b>Starting from:</b> ${pkg.least_price}/per person
                      </span>
                      <span className="block">
                        <b>Facilities:</b> {pkg.facilities}
                      </span>
                      <span className="block">
                        <b>Meals:</b>{" "}
                        {pkg.meals.length > 30 ? (
                          <>{pkg.meals.substring(0, 30)}...</>
                        ) : (
                          pkg.meals
                        )}
                      </span>
                      <span className="block">
                        <b>Activities:</b>{" "}
                        {pkg.activities.length > 30 ? (
                          <>{pkg.activities.substring(0, 30)}...</>
                        ) : (
                          pkg.activities
                        )}
                      </span>
                      <span className="block">
                        <b>Duration:</b> {pkg.duration}
                      </span>
                    </p>

                    {/* Buttons */}
                    <div className="flex justify-between items-center">
                      <button
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-800 transition"
                        onClick={() => handleDetails(pkg.package_id)}
                      >
                        Check More
                      </button>
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
                        onClick={() => handleBooking(pkg.package_id)}
                      >
                        Book Package
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          !error && (
            <p className="text-red-500 text-center">
              No packages available for this destination.
            </p>
          )
        )}
      </div>

    </>
  );
};

export default Packages;
