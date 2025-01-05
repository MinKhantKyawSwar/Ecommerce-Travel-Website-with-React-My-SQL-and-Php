import React from "react";

const TotalIncome = ({ totalIncome }) => {
  return (
    <div className="h-auto bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <p className="text-3xl font-bold text-blue-600">
          ${totalIncome.total_income}
        </p>

        {/* Conditional rendering for the arrow and difference */}
        <div className="ml-4 flex items-center space-x-2">
          {totalIncome.is_higher ? (
            <div className="flex items-center text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 mr-1"
              >
                <path d="M12 19V5m-7 7l7-7 7 7" />
              </svg>
            </div>
          ) : totalIncome.difference < 0 ? (
            <div className="flex items-center text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 mr-1"
              >
                <path d="M12 5v14m7-7l-7 7-7-7" />
              </svg>
            </div>
          ) : null}

          {/* Display difference */}
          {totalIncome.difference !== undefined && (
            <p
              className={`ml-1 font-semibold text-sm ${
                totalIncome.is_higher ? "text-green-500" : "text-red-500"
              }`}
            >
              {totalIncome.difference > 0
                ? `+${totalIncome.difference}`
                : totalIncome.difference}
            </p>
          )}
        </div>
      </div>
      <h2 className="text-sm font-semibold text-gray-700 mt-2">Total Income</h2>
    </div>
  );
};

export default TotalIncome;
