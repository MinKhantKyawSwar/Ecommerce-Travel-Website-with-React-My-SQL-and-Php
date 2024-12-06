import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Packages from "./Packages";

const Details = () => {
  const [destination, setDestination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") ?
    localStorage.getItem("activeTab") : "overview" // Retrieve from localStorage or default
  );

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch details of a single destination
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

  useEffect(() => {
    findById();
  }, [id]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const goBackHandler = () => {
    localStorage.removeItem("activeTab");
    navigate(-1)
  } 

  return (
    <>
      <button className="border-2 px-3 py-2 m-2" onClick={() => goBackHandler()}>
        Go Back
      </button>

      <div className="mt-5 p-4 border flex">
        {destination.destination_image ? (
          <img
            src={`http://localhost:3000/backend/${destination.destination_image}`}
            alt="img"
            width={600}
          />
        ) : (
          <p>No Image Available For now</p>
        )}
        <div>
          <h2 className="text-2xl font-medium underline">
            Destination Details
          </h2>
          <p>
            <b>Name:</b> {destination.destination_name}
          </p>
          <p>
            <b>Country:</b> {destination.country}
          </p>
          <p>
            <b>Description:</b> {destination.description}
          </p>
          <p>
            <b>Bookings:</b> 
          </p>
        </div>
      </div>

      <div className=" mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center items-center justify-center">
          <li className="me-2">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === "overview" ? "border-blue-500 text-blue-500" : ""
              }`}
              onClick={() => handleTabClick("overview")}
            >
              Overview
            </button>
          </li>
          
          <li className="me-2">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === "packages" ? "border-blue-500 text-blue-500" : ""
              }`}
              onClick={() => handleTabClick("packages")}
            >
              Travel Packages
            </button>
          </li>
          <li>
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === "faq" ? "border-blue-500 text-blue-500" : ""
              }`}
              onClick={() => handleTabClick("faq")}
            >
              FAQ
            </button>
          </li>
        </ul>
      </div>

      <div>
        {activeTab === "overview" && (
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Location, Best time to Visit, Weather, Local Currency, Language,
              review, tips
            </p>
          </div>
        )}
        {activeTab === "facilities"  && (
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Accomodations(hotels, room features, assibility, family features),
              Dining, Transportation & parking, fun events, spa, guide, pet
              policies, wifi,
            </p>
          </div>
        )}
        {activeTab === "packages"  && (
          <Packages destination_id ={id} activeTab={activeTab}/>
        )}
        {activeTab === "faq"  && (
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
