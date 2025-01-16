import React from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { LuPackage } from "react-icons/lu";
import { HiMiniUsers } from "react-icons/hi2";
import { motion } from 'framer-motion';
import ScrollNumberAnimation from "./animation/ScrollNumberAnimation";

const WebsiteInfo = ({ packagesCount, travellers, destinationCount }) => {
  return (
    <>
      <div className="px-10 py-4 rounded-2xl border border-gray-600 mb-10">
        <p className="text-gray-600 text-3xl font-bold py-5">Track Your Journey: </p>
        <span >
          Explore Available Packages, Destinations, Total Travelers, and Active Adventures of our site.

        </span>
        <div className="flex flex-warp items-center justify-between py-10 w-[80%]">

          {/* Available Packages */}
          <div className="w-[15%] flex flex-col items-center text-center">
            <div className="flex flex-row">
              <LuPackage className="text-gray-600 text-5xl mt-6" />
              <ScrollNumberAnimation targetNumber={80} />
            </div>
            <p className="text-sm font-medium text-gray-700">Available Packages</p>
          </div>

          {/* Total Destinations */}
          <div className="w-[15%] flex flex-col items-center text-center">
            <div className="flex flex-row gap-2">
              <FaMapLocationDot className="text-gray-600 text-5xl mt-5" />
              <ScrollNumberAnimation targetNumber={27} />
            </div>

            <p className="text-sm font-medium text-gray-700">Total Destinations</p>
          </div>

          {/* Monthly Travellers */}
          <div className="w-[15%] flex flex-col items-center text-center ">
            <div className="flex  flex-row gap-2">
              <HiMiniUsers className="text-gray-600 text-5xl mt-6" />
              {/* {Number(travellers.current_month_count) +
             Number(travellers.previous_month_count)}+ */}
              <ScrollNumberAnimation targetNumber={210} />
            </div>
            <p className="text-sm font-medium text-gray-700">Monthly Travellers</p>
          </div>
          <div className="w-[15%] flex flex-col items-center text-center ">
            <div className="flex flex-row gap-2">
              <HiMiniUsers className="text-gray-600 text-5xl mt-6" />
              <ScrollNumberAnimation targetNumber={100} />

            </div>
            <p className="text-sm font-medium text-gray-700">Active Users</p>
          </div>
        </div>
      </div>

    </>
  );
};

export default WebsiteInfo;
