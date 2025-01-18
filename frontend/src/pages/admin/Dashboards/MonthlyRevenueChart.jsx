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

const MonthlyRevenueChart = ({ monthlyRevenueData }) => {
  const generateMonthRange = () => {
    const months = [];

    const today = new Date();

    // Generate past 12 months
    for (let i = 6; i > 0; i--) {
      const pastMonth = new Date();
      pastMonth.setMonth(today.getMonth() - i);
      months.push(`${pastMonth.getFullYear()}-${(pastMonth.getMonth() + 1).toString().padStart(2, '0')}`); // Format: YYYY-MM
    }

    // Add this month
    months.push(`${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}`);
    months.push(`${today.getFullYear()}-${(today.getMonth() + 2)}`);
    months.push(`${today.getFullYear()}-${(today.getMonth() + 3)}`);
    months.push(`${today.getFullYear()}-${(today.getMonth() + 4)}`);
    months.push(`${today.getFullYear()}-${(today.getMonth() + 5)}`);
    months.push(`${today.getFullYear()}-${(today.getMonth() + 6)}`);

    return months;
  };

  const months = generateMonthRange();

  // Group daily revenue by month
  const getMonthlyRevenue = () => {
    return months.map((month) => {
      return monthlyRevenueData
        .filter((entry) => {
          // Ensure that booking_day is in the correct format YYYY-MM to match
          const entryMonth = entry.booking_month.slice(0, 7); // Get YYYY-MM from booking_day
          return entryMonth === month; // Compare just the month (YYYY-MM)
        })
        .reduce((sum, entry) => Number(sum + entry.total_price), 0); // Sum up sales for that month
    });
  };

  const monthlyRevenue = getMonthlyRevenue();

  // Chart data and options
  const data = {
    labels: months,
    datasets: [
      {
        label: "Monthly Sales",
        type: "bar",
        data: monthlyRevenue,
        backgroundColor: "rgba(65, 105, 225, 0.5)", // Light blue with transparency
        borderColor: "rgba(25, 25, 112, 1)", // Dark blue border
        borderWidth: 2, // Adjusted bar border thickness
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
        text: "Monthly Sales Chart",
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

export default MonthlyRevenueChart;
