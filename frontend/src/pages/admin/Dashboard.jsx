import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [packagesCount, setPackagesCount] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample data
  // const totalIncome = 50000;
  const totalPeople = 300;
  const packages = 30;
  const topCountries = [
    { name: "USA", count: 300 },
    { name: "Canada", count: 200 },
    { name: "UK", count: 150 },
    { name: "Australia", count: 100 },
    { name: "Germany", count: 80 },
  ];
  const monthlyTravelLocations = {
    January: ["Paris", "New York", "Tokyo"],
    February: ["London", "Berlin", "Sydney"],
    March: ["Dubai", "Singapore", "Barcelona"],
    // Add more months as needed
  };

  // Data for charts
  const incomeData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Total Income",
        data: [
          4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000,
          15000,
        ], // Sample monthly income data
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Changed to blue
      },
    ],
  };

  const countryData = {
    labels: topCountries.map((country) => country.name),
    datasets: [
      {
        label: "Top Countries",
        data: topCountries.map((country) => country.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

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
      console.log(response.data.total_packages);

      if (response.data.status === 1) {
        setPackagesCount(response.data.total_packages);
      } else {
        setError("No data found");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    }
  };

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
        setError("No data found");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    }
  };

  useEffect(() => {
    getPackageCount();
    getTotalPrice();
  }, []);

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

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
          <p className="text-3xl font-bold text-blue-600">{totalPeople}</p>
          <h2 className="text-sm font-semibold text-gray-700">
            Total Travellers
          </h2>
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Monthly Income
        </h2>
        <Bar data={incomeData} />
      </div>

      <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Most Travel Locations by Month
        </h2>
        {Object.entries(monthlyTravelLocations).map(([month, locations]) => (
          <div key={month} className="mb-4 border-b pb-2">
            <h3 className="font-bold text-lg text-gray-800">{month}</h3>
            <ul className="list-disc pl-5">
              {locations.map((location, index) => (
                <li key={index} className="text-gray-600">
                  {location}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
