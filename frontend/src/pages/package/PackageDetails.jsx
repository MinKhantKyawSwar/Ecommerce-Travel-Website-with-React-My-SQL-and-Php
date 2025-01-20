import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { UserContext } from "../../providers/UserContext";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";

const PackageDetails = () => {
  const { savedNoti, updateSavedNoti } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [packageDetails, setPackageDetails] = useState({});
  const [savedPackages, setSavedPackages] = useState([]);

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

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

  const fetchData = async (id) => {
    const package_id = Number(id);
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/backend/getPackages.php`,
        {
          headers: {
            "Package-Id": package_id,
          },
        }
      );

      if (response.data.status === 1) {
        setPackageDetails(response.data.data[0]);
      } else {
        setError("No details found for this package");
      }
    } catch (err) {
      setError("Failed to fetch details: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (id) => {
    navigate(`/booking/${id}`);
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


  const handleDetails = (id) => {
    navigate(`package/${id}`);
  };

  const goBackHandler = () => {
    navigate(-1);
    localStorage.getItem("activeTab");
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  if (loading) return <div>Loading...</div>;

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
      <div className=" py-8 px-4 min-h-screen">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-3">
          <div className="absolute top-30 z-40 font-semibold flex items-center justify-between">
            <div className="flex items-center justify-center">
              <button
                className="flex py-2 mt-2 px-6 rounded-lg bg-transparent text-neutral-800 font-medium"
                onClick={goBackHandler}
              >

                <IoArrowBackCircle className="text-2xl mr-2" />Go Back
              </button>
            </div>
          </div>
          {error ? (
            <div className="text-red-500 font-bold">{error}</div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {/* Image Container */}
                <div className="col-span-3 md:col-span-2 relative h-[90vh] rounded-lg overflow-hidden">
                  <div className="relative w-full h-full">
                    <img
                      src={`http://localhost:3000/backend/${packageDetails.destination_image}`}
                    alt={packageDetails.city}
                    className="w-full h-full object-cover rounded-lg shadow-xl"
      />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  </div>
                  <div className="absolute top-5 right-5">
                    {localStorage.getItem("user_id") && (
                      <button
                        onClick={() => toggleSavedItem(id, packageDetails.price)}
                        className="text-gray-900 text-2xl hover:text-gray-800"
                      >
                        {savedPackages.includes(id) ? <FaBookmark /> : <FaRegBookmark />}
                      </button>
                    )}
                  </div>
                  <div className="absolute bottom-5 w-full bg-opacity-90 px-6 py-4 rounded-lg">
                    <h2 className="md:text-3xl font-extrabold text-white tracking-wide text-lg text-shadow">
                      {packageDetails.package_name}
                    </h2>
                    <p className="text-sm md:text-lg font-medium text-white">
                      {packageDetails.city} ({packageDetails.country})
                    </p>
                    <p className="md:text-4xl font-semibold tracking-wider text-green-400">
                      $ {packageDetails.price}.00
                    </p>
                    <div className="space-y-3 mt-4">
                      <button
                        className="w-full md:w-auto text-xs md:text-sm font-semibold border-green-500 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
                        onClick={() => handleBooking(id)}
                      >
                        Book Package
                      </button>
                    </div>
                  </div>
                </div>

                {/* Details Container */}
                <div className="col-span-3 bg-white px-6 py-6 rounded-lg shadow-xl space-y-6 overflow-y-auto h-[90vh]">
                  <div className="space-y-6">
                    {/* Flight Section */}
                    <div className="flex flex-col">
                      <p className="text-2xl font-bold text-gray-900 underline">
                        Flight
                      </p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-lg shadow-md border border-gray-300">
                      <img
                        src={`http://localhost:3000/backend/${packageDetails.flight_image}`}
                        alt="flight"
                        className="w-full h- md:w-1/3 rounded-lg shadow-md object-cover"
                      />
                      <div className="md:p-5">
                        <p className="text-lg font-semibold text-gray-800 leading-relaxed">
                          {packageDetails.flight_description}
                        </p>
                        <div className="flex gap-3 mt-3">
                          <p className="text-2xl font-semibold tracking-wide text-green-500">
                            $
                            {(
                              packageDetails.price -
                              (packageDetails.price / 2) * 1.5
                            ).toFixed(2)}
                          </p>
                          <p className="text-gray-600 tracking-wide mt-1">
                            for both ways
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Accommodation Section */}
                    <div className="flex flex-col">
                      <p className="text-2xl font-bold text-gray-900 underline">
                        Accommodation
                      </p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-lg shadow-md border border-gray-300">
                      <img
                        src={`http://localhost:3000/backend/${packageDetails.facilities_image}`}
                        alt="Facilities"
                        className="w-full md:w-1/3 rounded-lg shadow-md object-cover"
                      />
                      <div className="md:p-5">
                        <p className="text-lg font-semibold text-gray-800 leading-relaxed">
                          {packageDetails.facilities}
                        </p>
                        <div className="flex gap-3 mt-3">
                          <p className="text-2xl font-semibold tracking-wide text-green-500">
                            $
                            {(
                              packageDetails.price -
                              packageDetails.price / 2
                            ).toFixed(2)}
                          </p>
                          <p className="text-gray-600 tracking-wide mt-1">
                            for {packageDetails.duration} days /{" "}
                            {packageDetails.duration - 1} nights
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Meals Section */}
                    <div className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-lg shadow-md border border-gray-300">
                      <img
                        src={`http://localhost:3000/backend/${packageDetails.meals_image}`}
                        alt="Meals"
                        className="w-full md:w-1/3 rounded-lg shadow-md object-cover"
                      />
                      <div className="md:p-5">
                        <p className="text-lg font-semibold text-gray-800 leading-relaxed">
                          {packageDetails.meals}
                        </p>
                        <div className="flex gap-3 mt-3">
                          <p className="text-2xl font-semibold tracking-wide text-green-500">
                            $
                            {(
                              packageDetails.price -
                              (packageDetails.price / 2) * 1.5
                            ).toFixed(2)}
                          </p>
                          <p className="text-gray-600 tracking-wide mt-1">
                            for {packageDetails.duration} days /{" "}
                            {packageDetails.duration - 1} nights
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Accommodation Section */}
                    <div className="flex flex-col">
                      <p className="text-2xl font-bold text-gray-900 underline">
                        Activities
                      </p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-lg shadow-md border border-gray-300">
                      <img
                        src={`http://localhost:3000/backend/${packageDetails.activities_image}`}
                        alt="activities"
                        className="w-full md:w-1/3 rounded-lg shadow-md object-cover"
                      />
                      <div className="md:p-5">
                        <p className="text-lg  text-gray-800 leading-relaxed">
                          {packageDetails.activities}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tour Guide Profile */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800  pl-2 border-gray-300 pb-2">
                  Tour Guide Profile
                </h2>
                <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-6 rounded-lg shadow-lg">
                  {/* Guide Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={`http://localhost:3000/backend/${packageDetails.guide_image}`}
                      alt="Tour Guide"
                      className="w-32 h-32 object-cover rounded-full border-4 border-green-500 shadow-lg"
                    />
                  </div>

                  {/* Guide Info */}
                  <div className="flex flex-col">
                    <div className="flex">
                      <p className="text-2xl font-semibold text-gray-600">
                        {packageDetails.guide_name}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="text-lg text-gray-600">
                        {packageDetails.email}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="text-lg text-gray-600">
                        {packageDetails.language}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Guide Description */}
                <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-md">
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    About Our Guide Leader
                  </p>

                  <p className="text-base text-gray-600 leading-relaxed">
                    {packageDetails.guide_description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PackageDetails;
