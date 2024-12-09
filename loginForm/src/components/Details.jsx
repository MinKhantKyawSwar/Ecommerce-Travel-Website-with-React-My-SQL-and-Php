import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Packages from "./Packages";

const Details = () => {
  const [destination, setDestination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab")
      ? localStorage.getItem("activeTab")
      : "overview" // Retrieve from localStorage or default
  );
  const [prevReview, setPrevReview] = useState([]);

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
    navigate(-1);
  };

  const getPrevReview = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/backend/getReview.php`,
        {
          headers: {
            "Destination-Id": id,
          },
        }
      );

      if (response.data.status === 1) {
        console.log(response.data.data);
        setPrevReview(response.data.data);
      } else {
        setError("No details found for this destination");
      }
    } catch (err) {
      setError("Failed to fetch details: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = () => {};

  useEffect((_) => {
    getPrevReview();
  }, []);

  return (
    <>
      <button
        className="border-2 px-3 py-2 m-2"
        onClick={() => goBackHandler()}
      >
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
            <div className="mt-10">
              <h1 className="text-white text-xl font-bold">Reviews</h1>
              <div className="mt-4 space-y-4">
                {prevReview.length > 0 ? (
                  prevReview.map((review, index) => (
                    <div
                    key={index}
                    className="bg-gray-800 rounded-lg p-6 shadow-lg"
                  >
                    <div className="flex items-center mb-4">
                      <img
                        src={`http://localhost:3000/backend/${review.profile_image}`}
                        alt="Profile Image"
                        className="w-16 h-16 rounded-full border-2 border-gray-600 mr-4"
                      />
                      <h2 className="text-2xl font-semibold text-white">
                        {review.review_title}
                      </h2>
                    </div>
                    <p className="text-lg text-yellow-400 mb-2">
                      Rating: {review.rating}
                    </p>
                    <p className="font-medium text-gray-300 mb-2">
                      Date: {new Date(review.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-200">
                      {review.description}
                    </p>
                  </div>
                  ))
                ) : (
                  <div className="text-xl text-gray-300">No reviews yet.</div>
                )}
              </div>
              <form onSubmit={handleAddReview} className="mt-6">
                <textarea
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="Add your review..."
                  className="w-full p-2 rounded-md bg-gray-600 text-white"
                  rows="3"
                />
                <button
                  type="submit"
                  className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-200"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}
        {activeTab === "facilities" && (
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Accomodations(hotels, room features, assibility, family features),
              Dining, Transportation & parking, fun events, spa, guide, pet
              policies, wifi,
            </p>
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
