import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [packagesCount, setPackagesCount] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [travellers, setTravellers] = useState(0);
  const [allPackages, setAllPackages] = useState(0);
  
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
        setTotalIncome(response.data.total_price);
      } else {
        setError("No data found for income");
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
        setTravellers(response.data.data.customer_count);
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
    Promise.all([getPackageCount(), getTotalPrice(), getCustomerCount()])
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Income Card */}
        <div className="h-24 bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <p className="text-3xl font-bold text-blue-600">${totalIncome}</p>
          <h2 className="text-sm font-semibold text-gray-700">Total Income</h2>
        </div>

        {/* Total People Card */}
        <div className="h-24 bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <p className="text-3xl font-bold text-blue-600">{packagesCount}</p>
          <h2 className="text-sm font-semibold text-gray-700">Packages</h2>
        </div>

        {/* Total Travellers Card */}
        <div className="h-24 bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <p className="text-3xl font-bold text-blue-600">{travellers}</p>
          <h2 className="text-sm font-semibold text-gray-700">
            Total Travellers
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
