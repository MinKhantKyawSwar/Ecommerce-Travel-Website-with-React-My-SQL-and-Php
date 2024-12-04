import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Details = () => {
  const [destination, setDestination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview"); // Track the active tab

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

  return (
    <>
      <button className="border-2 px-3 py-2 m-2" onClick={() => navigate(-1)}>
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
                activeTab === "facilities"
                  ? "border-blue-500 text-blue-500"
                  : ""
              }`}
              onClick={() => handleTabClick("facilities")}
            >
              Facilities
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
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              3 packages
            </p>
            <p className="font-medium text-2xl"><br></br>1. Wanderlust Escape<br></br></p>
            <p className="text-sm">
              <b>Price Range:</b> $499 - $799 per person<br></br>
              <b>Number of People:</b> 1-2 people (Solo or Couple Package){" "}
              <br></br> <b>Facilities:</b> Accommodation: 4-star hotel or luxury
              homestay for 3 nights and 4 days.<br></br> <b>Meals:</b> Daily
              breakfast and one gourmet dinner. <br></br> <b>Transportation:</b>{" "}
              Airport/train station transfers and a private car for local
              sightseeing. <br></br> <b>Activities:</b>
              <br></br>Guided city tour with a professional guide. <br></br>
              Entry tickets to popular attractions. <br></br>Relaxation at a
              wellness spa. <br></br> <b>Extras:</b>
              Complimentary travel kit and a photo session at a scenic location.
            </p>

            <p className="font-medium text-2xl"><br></br>2. Adventure Horizon<br></br></p>
            <p className="text-sm">
              <b>Price Range:</b> $899 - $1,299 per person<br></br>
              <b>Number of People:</b> 2-4 people (Group Package)<br></br>
              <b>Facilities:</b> Accommodation: Luxury tents or adventure lodges
              for 5 nights and 6 days.<br></br>
              <b>Meals:</b> All meals (breakfast, lunch, and dinner) included
              with snacks.<br></br>
              <b>Transportation:</b> 4x4 off-road vehicles and group airport
              transfers.<br></br>
              <b>Activities:</b>
              <br></br>
              Jungle safari or mountain trekking.<br></br>
              Adventure sports like ziplining or kayaking.<br></br>
              Night camping with a bonfire and stargazing.<br></br>
              <b>Extras:</b> Personalized adventure kits, trekking gear, and a
              GoPro rental for recording your journey.
            </p>

            <p className="font-medium text-2xl"><br></br>3. Serenity Voyage<br></br></p>
            <p className="text-sm">
              <b>Price Range:</b> $1,499 - $2,099 per person<br></br>
              <b>Number of People:</b> 1-6 people (Family or Friends Package)
              <br></br>
              <b>Facilities:</b> Accommodation: Private beachfront villa or
              mountain chalet for 7 nights and 8 days.<br></br>
              <b>Meals:</b> All-inclusive gourmet dining with unlimited
              beverages.<br></br>
              <b>Transportation:</b> Private yacht or luxury car for local
              travel.<br></br>
              <b>Activities:</b>
              <br></br>
              Water sports (snorkeling, paddleboarding, jet skiing).<br></br>
              Private guided cultural tours and cooking classes.<br></br>
              Sunset cruise with live music and dining.<br></br>
              <b>Extras:</b> Personal concierge, daily housekeeping, and a
              farewell gift box with local souvenirs.
            </p>
          </div>
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
