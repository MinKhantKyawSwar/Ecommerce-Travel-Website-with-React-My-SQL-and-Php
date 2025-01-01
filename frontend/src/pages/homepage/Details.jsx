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
            Category: destination.category_id,
            Destination_Id: id,
          },
        }
      );

      console.log( destination.country,destination.category_id, id);

      if (response.data.status === 1) {
        const destinations = response.data.data;

        // Shuffle the array to get random items
        const shuffledDestinations = destinations.sort(
          () => 0.5 - Math.random()
        );

        // Filter to get unique destination IDs
        const uniqueDestinations = [];
        const destinationIds = new Set();

        for (let destination of shuffledDestinations) {
          if (!destinationIds.has(destination.destination_id)) {
            uniqueDestinations.push(destination);
            destinationIds.add(destination.destination_id);
          }

          // Stop once we have 4 unique destinations
          if (uniqueDestinations.length === 4) break;
        }

        // Set the random destinations
        setRandomDestinations(uniqueDestinations);
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
  if (loading) return <div className="text-center mt-10">Loading...</div>

  return (
    <>
      <button
        className="border-2 px-4 py-2 m-2 bg-gray-800  text-white hover:bg-black transition-all duration-200 mt-10 rounded-xl"
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
                  .map((destination, index) => (
                    <div
                      className="relative bg-white rounded-lg overflow-hidden shadow-lg"
                      key={index} // Use unique key
                    >
                      
                      <figure className="relative">
                        <img
                          src={
                            destination.destination_image
                              ? `http://localhost:3000/backend/${destination.destination_image}`
                              : "default-image.jpg"
                          }
                          alt={`Image of ${destination.city}, ${destination.country}`}
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
                          {destination.description.substring(0, 55)}...
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
