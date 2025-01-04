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

    // Generate past 10 days
    for (let i = 10; i > 0; i--) {
      const pastDate = new Date();
      pastDate.setDate(today.getDate() - i);
      dates.push(pastDate.toISOString().split("T")[0]); // Format: YYYY-MM-DD
    }

    // Add today's date
    dates.push(today.toISOString().split("T")[0]);

    // Generate next 10 days
    for (let i = 1; i <= 10; i++) {
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
        type: "bar",
        data: dates.map((date) => {
          const match = dailyRevenue.find(
            (entry) => entry.booking_day === date
          );
          return match ? match.total_price : 0; // Use 0 if no data for the date
        }),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Max Revenue",
        type: "line",
        data: new Array(dates.length).fill(), // Use max revenue for all dates
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily Sales and Max Revenue Chart",
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
    },
  };

  return (
    <div className="w-full max-w-6xl h-full mx-auto p-4 bg-gray-50 rounded-lg shadow-lg">
      <Bar data={data} options={options} />
    </div>
  );
};

export default DailyRevenueChart;
