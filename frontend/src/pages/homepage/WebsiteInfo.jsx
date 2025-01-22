import React from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { LuPackage } from "react-icons/lu";
import { HiMiniUsers } from "react-icons/hi2";
import { motion } from 'framer-motion';
import ScrollNumberAnimation from "./animation/ScrollNumberAnimation";

const WebsiteInfo = ({ packagesCount, travellers, destinationCount }) => {
  return (
    <>
      <div className="px-6 md:px-10 py-6 rounded-2xl border border-gray-600 mb-10 text-center">
        <p className="text-gray-600 text-2xl md:text-4xl font-bold py-5">
          Find Out About Trailblazers!
        </p>
        <span className="block text-sm md:text-base text-gray-600">
          Explore Available Packages, Destinations, Total Travelers, and Active Adventures on our site.
        </span>
        <div className="flex flex-wrap justify-between py-8 gap-6 md:gap-10">
          {/* Available Packages */}
          <div className="w-1/2 md:w-[22%] flex flex-col items-center text-center">
            <div className="flex items-center">
              <LuPackage className="text-gray-600 text-4xl md:text-5xl mt-2" />
              <ScrollNumberAnimation targetNumber={80} />
            </div>
            <p className="text-xs md:text-sm font-medium text-gray-700 mt-2">
              Available Packages
            </p>
          </div>

          {/* Total Destinations */}
          <div className="w-1/2 md:w-[22%] flex flex-col items-center text-center">
            <div className="flex items-center gap-2">
              <FaMapLocationDot className="text-gray-600 text-4xl md:text-5xl mt-2" />
              <ScrollNumberAnimation targetNumber={27} />
            </div>
            <p className="text-xs md:text-sm font-medium text-gray-700 mt-2">
              Total Destinations
            </p>
          </div>

          {/* Monthly Travellers */}
          <div className="w-1/2 md:w-[22%] flex flex-col items-center text-center">
            <div className="flex items-center gap-2">
              <HiMiniUsers className="text-gray-600 text-4xl md:text-5xl mt-2" />
              <ScrollNumberAnimation targetNumber={210} />
            </div>
            <p className="text-xs md:text-sm font-medium text-gray-700 mt-2">
              Monthly Travellers
            </p>
          </div>

          {/* Active Users */}
          <div className="w-1/2 md:w-[22%] flex flex-col items-center text-center">
            <div className="flex items-center gap-2">
              <HiMiniUsers className="text-gray-600 text-4xl md:text-5xl mt-2" />
              <ScrollNumberAnimation targetNumber={100} />
            </div>
            <p className="text-xs md:text-sm font-medium text-gray-700 mt-2">
              Active Users
            </p>
          </div>
        </div>
      </div>
    </>

  );
};

export default WebsiteInfo;
