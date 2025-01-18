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

const YearlyRevenueChart = ({ yearlyRevenueData }) => {
  const generateYearRange = () => {
    const years = [];
    const today = new Date();

    // Generate past 5 years
    for (let i = 5; i > 0; i--) {
      const pastYear = new Date();
      pastYear.setFullYear(today.getFullYear() - i);
      years.push(pastYear.getFullYear()); // Add past years
    }

    // Add this year
    years.push(today.getFullYear());
    years.push(today.getFullYear()+1);
    years.push(today.getFullYear()+2);
    years.push(today.getFullYear()+3);

    return years;
  };

  const years = generateYearRange();

  // Group yearly revenue by year
  const getYearlyRevenue = () => {
    return years.map((year) => {
      // Filter by the year from `booking_date` (adjust the property if needed)
      return yearlyRevenueData
        .filter((entry) => {
          // Assuming entry.booking_year is the correct year field, adjust if needed
          const entryYear = new Date(entry.booking_year).getFullYear()+1; // Extract the year
          return entryYear === year; // Compare the extracted year with the year in the loop
        })
        .reduce((sum, entry) =>Number( sum + entry.total_price), 0); // Sum up sales for that year (initial value set to 0)
    });
  };

  const yearlyRevenue = getYearlyRevenue();

  // Chart data and options
  const data = {
    labels: years,
    datasets: [
      {
        label: "Yearly Sales",
        type: "bar",
        data: yearlyRevenue,
        backgroundColor: "rgba(25, 122, 272, 0.5)", // Light teal with transparency
        borderColor: "rgba(54, 12, 235, 1)", // Blue border color
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
        text: "Yearly Sales Chart",
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

export default YearlyRevenueChart;
