import React from "react";

const TotalTravellers = ({ travellers }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-3xl font-bold text-blue-600">
          {Number(travellers.current_month_count) + Number(travellers.previous_month_count)}
        </p>
        <div className="flex items-center">
          {travellers.current_month_count > travellers.previous_month_count ? (
            <div className="flex items-center text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 mr-1"
              >
                <path d="M12 19V5m-7 7l7-7 7 7" />
              </svg>
              <span className="font-semibold">+{travellers.difference}</span>
            </div>
          ) : travellers.current_month_count <
            travellers.previous_month_count ? (
            <div className="flex items-center text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 mr-1"
              >
                <path d="M12 5v14m7-7l-7 7-7-7" />
              </svg>
              <span className="font-semibold">{travellers.difference}</span>
            </div>
          ) : (
            <div className="text-gray-600 font-semibold">No Change</div>
          )}
        </div>
      </div>

      <h2 className="text-sm font-semibold text-gray-700 mt-2">
        Total Travellers
      </h2>
    </div>
  );
};

export default TotalTravellers;
