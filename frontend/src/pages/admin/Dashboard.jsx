import React, { useEffect, useState } from "react";
import axios from "axios";
import DailyRevenueChart from "./Dashboards/DailyRevenueChart";
import UserAccountCreationChart from "./Dashboards/UserAccountCreationChart";
import TopDestinations from "./Dashboards/TopDestinations";
import TopPackages from "./Dashboards/TopPackages";

const Dashboard = () => {
  const [packagesCount, setPackagesCount] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [travellers, setTravellers] = useState(0);
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [userAccountsData, setUserAccountsData] = useState([]);
  const [destinationsData, setDestinationsData] = useState([]);
  const [packagesData, setPackagesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Packages Count
  const getPackageCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/dashboard.php",
        {
          headers: {
            "Content-Type": "application/json",
            "Packages-Id": "",
          },
        }
      );
      if (response.data.status === 1) {
        setPackagesCount(response.data.total_packages);
      } else {
        setError("No data found for packages");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    }
  };

  // Fetch Total Income
  const getTotalPrice = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/dashboard.php",
        {
          headers: {
            "Content-Type": "application/json",
            Total_Income: "",
          },
        }
      );
      if (response.data.status === 1) {
        setTotalIncome(response.data.data);
        console.log(response.data.data);
      } else {
        setError("No data found for income");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    }
  };

  const getDailyRevenue = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/dashboard.php",
        {
          headers: {
            "Content-Type": "application/json",
            Total_Revenue_Each_Day: "",
          },
        }
      );
      if (response.data.status === 1) {
        setDailyRevenue(response.data.daily_revenue);
      } else {
        setError("No data found for income");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    }
  };

  const getTopDestinations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/dashboard.php",
        {
          headers: {
            "Content-Type": "application/json",
            Top_Destinations: "",
          },
        }
      );
      if (response.data.status === 1) {
        setDestinationsData(response.data.data);
      } else {
        setError("No data found for destination");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    }
  };

  const getTopPackages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/dashboard.php",
        {
          headers: {
            "Content-Type": "application/json",
            Top_Packages: "",
          },
        }
      );
      if (response.data.status === 1) {
        setPackagesData(response.data.data);
      } else {
        setError("No data found for top packages.");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    }
  };

  const getAccountCreation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/dashboard.php",
        {
          headers: {
            "Content-Type": "application/json",
            User_Account_Creation: "",
          },
        }
      );
      if (response.data.status === 1) {
        setUserAccountsData(response.data.daily_account_creation);
      } else {
        setError("No data found for account creation");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    }
  };

  // Fetch Customer Count
  const getCustomerCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getCustomerCount.php",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === 1) {
        setTravellers(response.data.data);
      } else {
        setError("No data found for customers");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    }
  };

  // Fetch all data when component mounts
  useEffect(() => {
    setLoading(true); // Set loading to true when data fetch starts
    Promise.all([
      getPackageCount(),
      getTotalPrice(),
      getCustomerCount(),
      getDailyRevenue(),
      getAccountCreation(),
      getTopDestinations(),
      getTopPackages(),
    ])
      .then(() => {
        setLoading(false); // Set loading to false when all data is fetched
      })
      .catch((err) => {
        setLoading(false); // Set loading to false in case of error
        setError("An error occurred while fetching data.");
      });
  }, []);

  // Loading state for data fetching
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-2xl text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {error && (
        <div className="bg-red-200 p-4 rounded-lg mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Income Card */}
        <div className="h-auto min-h-[200px] bg-white p-5 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-blue-600">
              ${totalIncome.total_income}
            </p>

            {/* Conditional rendering for the arrow and difference */}
            <div className="ml-2 flex items-center mt-4">
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
              {totalIncome.difference && (
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
          <h2 className="text-sm font-semibold text-gray-700">Total Income</h2>
        </div>

        {/* Total Packages Card */}
        <div className="h-auto min-h-[200px] bg-white p-5 rounded-lg shadow-lg">
          <p className="text-3xl font-bold text-blue-600">{packagesCount}</p>
          <h2 className="text-sm font-semibold text-gray-700">Packages</h2>
        </div>

        {/* Total Travellers Card */}
        <div className="h-auto min-h-[200px] bg-white p-5 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-blue-600">
              {travellers.current_month_count + travellers.previous_month_count}
            </p>
            <h2 className="text-sm font-semibold text-gray-700">
              Total Travellers
            </h2>
          </div>

          <div className="flex items-center">
            {travellers.current_month_count >
            travellers.previous_month_count ? (
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
                <span className="text-sm font-semibold">
                  +{travellers.difference}
                </span>
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
                  className="w-5 h-5 mr-1"
                >
                  <path d="M12 5v14m7-7l-7 7-7-7" />
                </svg>
                <span className="text-sm font-semibold">
                  -{travellers.difference}
                </span>
              </div>
            ) : (
              <div className="text-gray-600 text-sm font-semibold">
                No Change
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Left Section */}
          <div className="flex-1 relative h-[100%] min-h-[100%] overflow-hidden">
            <TopPackages packagesData={packagesData} />
          </div>

          {/* Right Section */}
          <div className="flex-1 relative h-[100%] min-h-[100%] overflow-hidden">
            <TopDestinations destinationsData={destinationsData} />
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Daily Revenue
        </h2>
        <div className="relative h-[400px] min-h-[300px] overflow-hidden">
          <DailyRevenueChart dailyRevenue={dailyRevenue} />
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          User Account Creation in Past and Current Month
        </h2>
        <div className="relative h-[100%] min-h-[100%] overflow-hidden">
          <UserAccountCreationChart userAccountsData={userAccountsData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
