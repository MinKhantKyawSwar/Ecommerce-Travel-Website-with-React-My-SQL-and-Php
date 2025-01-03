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
          alert("Already saved");
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
    navigate(`/booking/${id}`);
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
      <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 mb-10">
        {!error && packages.length > 0 ? (
          <>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {packages.length} packages Available
            </p>
            <div className="flex gap-10">
              {packages.map((pkg) => (
                <div
                  key={pkg.package_id}
                  className="border rounded-lg p-4 shadow-md w-full md:w-1/3"
                >
                  <button
                    onClick={() =>
                      toggleSavedItem(pkg.package_id, pkg.least_price)
                    }
                    className="mb-2 px-2 py-2 rounded float-right text-lg"
                  >
                    {savedPackages.includes(pkg.package_id) ? (
                      <FaBookmark />
                    ) : (
                      <FaRegBookmark />
                    )}
                  </button>
                  <p className="font-medium text-xl mb-2">{pkg.package_name}</p>
                  <p className="text-sm mb-4">
                    Starting from <b>${pkg.least_price}</b>/per person
                    <br />
                    <b>Facilities:</b> {pkg.facilities}
                    <br />
                    <b>Meals:</b> {pkg.meals}
                    <br />
                    <b>Activities:</b> {pkg.activities.substring(0, 30)}...
                    <br />
                    <b>Duration:</b> {pkg.duration}
                  </p>
                  <div className="flex justify-between">
                    <button
                      className="border-2 border-blue-500 text-blue-500 px-3 py-2 rounded hover:bg-blue-500 hover:text-white transition"
                      onClick={() => handleDetails(pkg.package_id)}
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
    </>
  );
};

export default Packages;
