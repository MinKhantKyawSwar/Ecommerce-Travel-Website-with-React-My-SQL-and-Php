import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Packages from "../package/Packages";
import Reviews from "../package/Reviews";
import Overview from "../details/Overview";
import DetailsTopSection from "../details/DetailsTopSection";
import FAQ from "../details/FAQ";

const Details = () => {
  const [packages, setPackages] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [destination, setDestination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [randomDestinations, setRandomDestinations] = useState([]);

  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "overview"
  );

  const navigate = useNavigate();
  const { id } = useParams();

  const handleDetails = async (id) => {
    try {
      setLoading(true); // Show loading for details
      const response = await axios.get(
        `http://localhost:3000/backend/getDestination.php?id=${id}`
      );

      if (response.data.status === 1) {
        setSelectedDestination(response.data.data); // Save details of the selected destination
        navigate(`/destination/${id}`);
      } else {
        setError("No details found for this destination");
      }
    } catch (err) {
      setError("Failed to fetch details: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRandomDestinations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getRandomDestination.php",
        {
          headers: {
            Country: destination.country,
            Category: destination.category_name,
            Destination_Id: id,
          },
        }
      );
      console.log(destination.country, destination.category_name);

      if (response.data.status === 1) {
        setRandomDestinations(response.data.data);
        console.log(response.data.data);
      } else {
        setError("No data found");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const findById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/backend/getDestination.php?id=${id}`
      );

      if (response.data.status === 1) {
        setDestination(response.data.data);
        console.log(response.data.data);
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
    navigate("/");
  };

  useEffect(() => {
    findById();
  }, [id]);

  useEffect(() => {
    if (destination.country && destination.category_id) {
      getRandomDestinations();
    }
  }, [destination]);
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

      <DetailsTopSection destination={destination} activeTab={activeTab} />
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
          <>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6 rounded-lg shadow-lg bg-white">
              <div className="col-span-3 border border-gray-200 rounded-lg shadow-md p-6 bg-gray-50">
                <Overview destination={destination} />
              </div>
              <div className="col-span-2 border border-gray-200 rounded-lg shadow-md p-6 bg-gray-50">
                <Reviews id={id} />
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4 mt-6 text-center">
              More Like This
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {randomDestinations &&
                randomDestinations
                  .filter((destination) => destination.destination_id !== id) // Exclude the same destination_id
                  .map((destination) => (
                    <div
                      className="relative bg-white rounded-lg overflow-hidden shadow-lg"
                      key={destination.destination_id} // Use unique key
                    >
                      {/* Destination Image */}
                      <figure className="relative">
                        <img
                          src={
                            destination.destination_image
                              ? `http://localhost:3000/backend/${destination.destination_image}`
                              : "default-image.jpg"
                          }
                          alt={`Image of ${destination.city}, ${destination.country}`} // More descriptive alt text
                          className="w-full h-72 object-cover"
                        />
                        {/* Days Label */}
                        <span className="absolute top-4 left-4 bg-black text-white text-sm font-semibold px-3 py-1 rounded-md">
                          {destination.duration} Days
                        </span>
                        {/* Rating Badge */}
                        <span className="absolute top-4 right-4 bg-yellow-500 text-white text-sm font-semibold px-2 py-1 rounded-md flex items-center">
                          ⭐ {destination.rating}
                        </span>
                      </figure>

                      {/* Card Body */}
                      <div className="p-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {destination.city}
                        </h3>
                        <p className="text-sm text-gray-500 mb-1">
                          {destination.country}
                        </p>
                        <p className="text-sm text-gray-700 mb-4">
                          {destination.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-gray-900">
                            ${destination.price}
                          </span>
                          <button
                            className="px-4 py-2 text-white bg-black rounded-lg hover:bg-yellow-500"
                            onClick={() =>
                              handleDetails(destination.destination_id)
                            }
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </>
        )}
        {activeTab === "packages" && (
          <Packages
            destination_id={id}
            packages={packages}
            isSaved={isSaved}
            setPackages={setPackages}
            setIsSaved={setIsSaved}
          />
        )}
        {activeTab === "faq" && (
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
           <FAQ/>
          </div>
        )}
      </div>
    </>
  );
};

export default Details;
