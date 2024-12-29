import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Packages from "../package/Packages";
import Reviews from "../package/Reviews";

const Details = () => {
  const [destination, setDestination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "overview"
  );

  const navigate = useNavigate();
  const { id } = useParams();

  const findById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/backend/getDestination.php?id=${id}`
      );

      if (response.data.status === 1) {
        setDestination(response.data.data);
      } else {
        setError("No details found for this destination");
      }
    } catch (err) {
      setError("Failed to fetch details: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const goBackHandler = () => {
    localStorage.removeItem("activeTab");
    navigate(-1);
  };

  useEffect(() => {
    findById();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (error)
    return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <>
      <button
        className="border-2 px-4 py-2 m-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-200"
        onClick={goBackHandler}
      >
        Go Back
      </button>

      <div className="mt-5 p-6 border rounded-lg shadow-md bg-white">
        <div className="pb-6 border-b">
          <p className="text-2xl font-semibold text-gray-800">
            {destination.city}
          </p>
          <span className="text-gray-600 flex items-center mt-1">
            📍 {destination.country}
          </span>
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
            ].map((image, index) => (
              <div key={index}>
                {image ? (
                  <img
                    src={`http://localhost:3000/backend/${image}`}
                    alt={`Destination Side ${index + 1}`}
                    className="w-full h-40 rounded-lg shadow-lg object-cover"
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

      <div className="md:ml-4 mt-4 md:mt-0">
        <h2 className="text-2xl font-medium underline">Destination Details</h2>

        <p className="text-lg">
          <b>Country:</b> {destination.country}
        </p>
        <p className="text-lg">
          <b>Description:</b> {destination.description}
        </p>
        <p className="text-lg">
          <b>Bookings:</b> {/* Add booking details here */}
        </p>
      </div>

      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center items-center justify-center">
          {["overview", "packages", "faq"].map((tab) => (
            <li className="me-2" key={tab}>
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === tab ? "border-blue-500 text-blue-500" : ""
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        {activeTab === "overview" && (
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Location, Best time to Visit, Weather, Local Currency, Language,
              review, tips
            </p>
            <Reviews id={id} />
          </div>
        )}
        {activeTab === "packages" && (
          <Packages destination_id={id} activeTab={activeTab} />
        )}
        {activeTab === "faq" && (
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This is some placeholder content for the{" "}
              <strong className="font-medium text-gray-800 dark:text-white">
                faq tab
              </strong>
              .
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Details;
