import React, { useEffect, useState } from "react";
import axios from "axios";
import DailyRevenueChart from "./Dashboards/DailyRevenueChart";
import UserAccountCreationChart from "./Dashboards/UserAccountCreationChart";
import TopDestinations from "./Dashboards/TopDestinations";
import TopPackages from "./Dashboards/TopPackages";
import TotalIncome from "./Dashboards/TotalIncome";
import TotalTravellers from "./Dashboards/TotalTravellers";
import TopCustomers from "./Dashboards/TopCustomers";
import TopRating from "./Dashboards/TopRating";
import MonthlyRevenueChart from "./Dashboards/MonthlyRevenueChart";
import YearlyRevenueChart from "./Dashboards/YearlyRevenueChart";
import DestinationTravelersChart from "./Dashboards/DestinationTravelersChart";
import PaymentCountChart from "./Dashboards/PaymentCountChart";

const Dashboard = () => {
  const [packagesCount, setPackagesCount] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [travellers, setTravellers] = useState(0);
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [monthlyRevenueData, setMonthlyRevenue] = useState([]);
  const [yearlyRevenueData, setYearlyRevenue] = useState([]);
  const [destinationData, setDestinationData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [userAccountsData, setUserAccountsData] = useState([]);
  const [destinationsData, setDestinationsData] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [topRating, setTopRating] = useState([]);
  
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

  const getPaymentCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/dashboard.php",
        {
          headers: {
            "Content-Type": "application/json",
            "Total_Payment_Count": "",
          },
        }
      );
      if (response.data.status === 1) {
        setPaymentData(response.data.total_payment_count);
        console.log(response.data.total_payment_count);
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

  const getMonthlyRevenue = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/dashboard.php",
        {
          headers: {
            "Content-Type": "application/json",
            Total_Revenue_Each_Month: "",
          },
        }
      );
      if (response.data.status === 1) {
        setMonthlyRevenue(response.data.monthly_revenue);
      } else {
        setError("No data found for income");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    }
  };

  const getYearlyRevenue = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/dashboard.php",
        {
          headers: {
            "Content-Type": "application/json",
            Total_Revenue_Each_Year: "",
          },
        }
      );
      if (response.data.status === 1) {
        setYearlyRevenue(response.data.yearly_revenue);
      } else {
        setError("No data found for income");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    }
  };
  const fetchDestinationData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/dashboard.php",
        {
          headers: {
            "Content-Type": "application/json",
            Total_Travelers_Per_Destination: "",
          },
        }
      );

      if (response.data.status === 1) {
        setDestinationData(response.data.chart_data);
      } else {
        setError("No data found for travelers destinations");
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

  const getTopRating = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/dashboard.php",
        {
          headers: {
            "Content-Type": "application/json",
            Average_Rating: "",
          },
        }
      );
      if (response.data.status === 1) {
        setTopRating(response.data.data);
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

  const getTopCustomers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/dashboard.php",
        {
          headers: {
            "Content-Type": "application/json",
            Total_Spent_Customers: "",
          },
        }
      );
      if (response.data.status === 1) {
        setTopCustomers(response.data.data);
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
      getTopCustomers(),
      getTopRating(),
      getMonthlyRevenue(),
      getYearlyRevenue(),
      fetchDestinationData(),
      getPaymentCount()
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Income Card */}
        <TotalIncome totalIncome={totalIncome} />

        {/* Total Packages Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-3xl font-bold text-blue-600">{packagesCount}</p>
          <h2 className="text-sm font-semibold text-gray-700 mt-2">Packages</h2>
        </div>

        {/* Total Travellers Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <TotalTravellers travellers={travellers} />
        </div>
      </div>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Travellers Around the World
        </h2>
        <div className="relative h-[300px] min-h-[300px] overflow-hidden">
        <DestinationTravelersChart destinationData={destinationData} />
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

      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Left Section */}
          <div className="flex-1 relative h-[100%] min-h-[100%] overflow-hidden">
            <TopCustomers topCustomers={topCustomers} />
          </div>

          {/* Right Section */}
          <div className="flex-1 relative h-[100%] min-h-[100%] overflow-hidden">
            <TopRating topRating={topRating} />
          </div>
        </div>
      </div>

      <div className="mt-8  bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Payment Count Chart
        </h2>
        <div className="relative h-[400px] min-h-[300px] overflow-hidden">
          <PaymentCountChart paymentData={paymentData} />
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Daily Sales
        </h2>
        <div className="relative h-[400px] min-h-[300px] overflow-hidden">
          <DailyRevenueChart dailyRevenue={dailyRevenue} />
        </div>
      </div>
     

      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Monthly Sales
        </h2>
        <div className="relative h-[400px] min-h-[300px] overflow-hidden">
          <MonthlyRevenueChart monthlyRevenueData={monthlyRevenueData} />
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Yearly Sales
        </h2>
        <div className="relative h-[400px] min-h-[300px] overflow-hidden">
          <YearlyRevenueChart yearlyRevenueData={yearlyRevenueData} />
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
