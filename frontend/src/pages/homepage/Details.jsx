import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Packages from "../package/Packages";
import Reviews from "../package/Reviews";
import Overview from "../details/Overview";
import DetailsTopSection from "../details/DetailsTopSection";

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
        console.log(response.data.data)
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

      <DetailsTopSection destination={destination} activeTab={activeTab} />

      <div>
        {activeTab === "overview" && (
          <div className="grid grid-cols-5 gap-6 p-6 rounded-lg shadow-lg">
            <div className="col-span-3 border border-gray-200 rounded-lg shadow-md p-4">
              <Overview destination={destination} />
            </div>
            <div className="col-span-2 border border-gray-50 rounded-lg shadow-md p-4">
              <Reviews id={id} />
            </div>
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
