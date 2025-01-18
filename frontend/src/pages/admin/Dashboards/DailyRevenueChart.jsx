import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const DailyRevenueChart = ({ dailyRevenue }) => {
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
  // Chart data and options
  const data = {
    labels: dates,
    datasets: [
      {
        label: "Daily Sales",
        type: "line",
        data: dates.map((date) => {
          const match = dailyRevenue.find(
            (entry) => entry.booking_day === date
          );
          return match ? Number(match.total_price) : 0; // Use 0 if no data for the date
        }),
        backgroundColor: "rgba(55, 132, 102, 0.2)", 
        borderColor: "rgba(55, 132, 102, 1)", 
        borderWidth: 2, // Adjusted line thickness
      },
    ],
    
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to scale with its container
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily Sales Chart",
        font: {
          size: 18, // Larger title font size
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `$${context.raw.toLocaleString()}`; // Format with $ and comma
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return `$${value.toLocaleString()}`; // Format y-axis labels with $
          },
        },
      },
      x: {
        ticks: {
          autoSkip: true, // Automatically skip labels if there are too many
          maxRotation: 0, // Avoid rotating labels on mobile
          minRotation: 0, // Avoid rotating labels on mobile
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
    <div className="w-full max-w-6xl h-80 mx-auto p-4 bg-gray-50 rounded-lg shadow-lg">
      <Bar data={data} options={options} />
    </div>
  );
};

export default DailyRevenueChart;
