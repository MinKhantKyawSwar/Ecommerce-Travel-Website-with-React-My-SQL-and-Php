import React from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { LuPackage } from "react-icons/lu";
import { HiMiniUsers } from "react-icons/hi2";
const WebsiteInfo = ({ packagesCount, travellers, destinationCount }) => {
  return (
    <>
      <div className="flex flex-wrap justify-evenly items-center gap-6 px-10 py-4 mb-10 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-inner">
        {/* Available Packages */}
        <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-2xl p-6 border-2 border-transparent hover:border-blue-500 hover:shadow-xl transition duration-300 transform hover:scale-105">
          <div className="text-blue-600 text-5xl mb-4">
            <LuPackage />
          </div>
          <h1 className="text-6xl font-semibold text-blue-600 my-4">
            {packagesCount}+
          </h1>
          <p className="text-lg font-medium text-gray-700">Available Packages</p>
        </div>

        {/* Total Destinations */}
        <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-2xl p-6 border-2 border-transparent hover:border-green-500 hover:shadow-xl transition duration-300 transform hover:scale-105">
          <div className="text-green-600 text-5xl mb-4">
            <FaMapLocationDot />
          </div>
          <h1 className="text-6xl font-semibold text-green-600 my-4">
            {destinationCount.destination_count}+
          </h1>
          <p className="text-lg font-medium text-gray-700">Total Destinations</p>
        </div>

        {/* Monthly Travellers */}
        <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-2xl p-6 border-2 border-transparent hover:border-purple-500 hover:shadow-xl transition duration-300 transform hover:scale-105">
          <div className="text-purple-600 text-5xl mb-4">
            <HiMiniUsers />
          </div>
          <h1 className="text-6xl font-semibold text-purple-600 my-4">
            {Number(travellers.current_month_count) +
              Number(travellers.previous_month_count)}+
          </h1>
          <p className="text-md font-medium text-gray-700">Monthly Travellers</p>
        </div>
      </div>
    </>
  );
};

export default WebsiteInfo;
