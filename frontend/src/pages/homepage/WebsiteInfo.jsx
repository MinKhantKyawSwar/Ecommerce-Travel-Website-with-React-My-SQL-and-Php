import React from "react";

const WebsiteInfo = ({ packagesCount, travellers, destinationCount }) => {
  return (
    <>
      <div className="flex flex-wrap justify-evenly items-center gap-6 px-10 py-4 rounded-lg shadow-lg mb-10">
        {/* Available Packages */}
        <div className="flex flex-col items-center text-center">
          <h1 className="my-4 font-medium text-4xl "
          >
            {packagesCount}
          </h1>
          <h1 className="font-medium text-lg text-gray-700">
            Available Packages
          </h1>
        </div>

        {/* Total Destinations */}
        <div className="flex flex-col items-center text-center">
          <h1
           
            className="my-4 font-medium text-4xl "
          >
            {destinationCount.destination_count}
          </h1>
          <p className="font-medium text-lg text-gray-700">
            Total Destinations
          </p>
        </div>

        {/* Monthly Travellers */}
        <div className="flex flex-col items-center text-center">
          <h1 className="my-4 font-medium text-4xl"
          >
            {Number(travellers.current_month_count) +
              Number(travellers.previous_month_count)}
          </h1>
          <p className="font-medium text-lg text-gray-700">
            Monthly Travellers
          </p>
        </div>
      </div>
    </>
  );
};

export default WebsiteInfo;
