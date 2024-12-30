import React from "react";
import { GiAirplaneDeparture, GiMeal } from "react-icons/gi";
import { FaBuilding } from "react-icons/fa";
import { BiTrip } from "react-icons/bi";

const Overview = ({ destination }) => {
  return (
    <>
      <div className=" md:ml-4 mt-4 md:mt-0">
        <div className="mt-4 mb-4">
          <h2 className="text-2xl font-medium ">About The Destination</h2>
        </div>
        <p className="text-sm">{destination.description}</p>
        <div className="mt-4 mb-4">
          <h3 className="text-xl font-medium mt-4">Our Facilities</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <div className="flex items-center gap-2 mt-2">
                <GiAirplaneDeparture />
                <p className="text-sm">{destination.flight_description}</p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <GiMeal />
                <p className="text-sm">{destination.meals}</p>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mt-2">
                <FaBuilding className="text-xl text-gray-700" />{" "}
                {/* Facility Icon */}
                <p className="text-sm">{destination.accommodation}</p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <BiTrip className="text-xl text-gray-700" />{" "}
                {/* Facility Icon */}
                <p className="text-sm">{destination.activities}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
