import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserAccountCreationChart = ({ userAccountsData }) => {
  const generateDateRange = () => {
    const dates = [];
    const today = new Date();

    // Generate past 30 days
    for (let i = 30; i > 0; i--) {
      const pastDate = new Date();
      pastDate.setDate(today.getDate() - i);
      dates.push(pastDate.toISOString().split("T")[0]); // Format: YYYY-MM-DD
    }

    // Add today's date
    dates.push(today.toISOString().split("T")[0]);

    // Generate next 30 days
    for (let i = 1; i <= 30; i++) {
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + i);
      dates.push(futureDate.toISOString().split("T")[0]); // Format: YYYY-MM-DD
    }

    return dates;
  };

  const dates = generateDateRange();

  // Calculate the max value from the data and round it up to the nearest 10
  const maxAccountsCreated = Math.max(
    ...dates.map((date) => {
      const match = userAccountsData.find((entry) => entry.date === date);
      return match ? match.accounts_created : 0;
    })
  );
  const yAxisMax = Math.ceil(maxAccountsCreated / 10) * 10; // Round up to the nearest 10

  // Prepare data for the chart
  const data = {
    labels: dates,
    datasets: [
      {
        label: "User Accounts Created",
        data: dates.map((date) => {
          const match = userAccountsData.find((entry) => entry.date === date);
          return match ? match.accounts_created : 0; // Use 0 if no data for the date
        }),
        backgroundColor: dates.map((date) => {
          const match = userAccountsData.find((entry) => entry.date === date);
          const value = match ? match.accounts_created : 0;
          return value === maxAccountsCreated ? "rgba(10, 85, 132)" : "rgba(75, 192, 192, 0.6)"; // Change color of max bar
        }),
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to scale with its container
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 12, // Adjust font size for smaller screens
          },
        },
      },
      title: {
        display: true,
        text: "User Accounts Created Per Day",
        font: {
          size: 16, // Adjust title size for smaller screens
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.raw} accounts`; // Display the number of accounts created
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
          font: {
            size: 14, // Adjust font size for x-axis labels
          },
        },
        ticks: {
          autoSkip: true, // Skip labels if they overlap
          maxRotation: 45, // Rotate labels for better readability
          minRotation: 30, // Prevent very small rotation on mobile
        },
      },
      y: {
        title: {
          display: true,
          text: "Accounts Created",
          font: {
            size: 14, // Adjust font size for y-axis labels
          },
        },
        max: yAxisMax, // Set the y-axis max to rounded value
        ticks: {
          callback: function (value) {
            return value.toLocaleString(); // Format y-axis labels
          },
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 20,
        bottom: 20,
      },
    },
  };

  return (
    <div className="w-full max-w-6xl h-96 mx-auto p-4 bg-gray-50 rounded-lg shadow-lg">
      <Bar data={data} options={options} />
    </div>
  );
};

export default UserAccountCreationChart;
