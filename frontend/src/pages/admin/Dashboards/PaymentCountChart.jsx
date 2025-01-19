import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

// Register Chart.js components
ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const PaymentCountChart = ({ paymentData }) => {
  // Handle empty or undefined data
  const hasData = paymentData && paymentData.length > 0;

  // Define a color palette
  const colors = [
    '#FF6384', // Color 1
    '#36A2EB', // Color 2
    '#FFCE56', // Color 3
    '#4BC0C0', // Color 4
    '#9966FF', // Color 5
    '#FF9F40', // Color 6
  ];

  // Generate colors for each payment method
  const backgroundColors = hasData
    ? paymentData.map((_, index) => colors[index % colors.length])
    : ['#D3D3D3']; // Default color if no data

  // Prepare data for the chart
  const chartData = {
    labels: hasData ? paymentData.map((item) => item.payment_name || "Unknown") : ["No Data"],
    datasets: [
      {
        label: 'Payment Count',
        data: hasData ? paymentData.map((item) => item.payment_count || 0) : [0],
        backgroundColor: backgroundColors,
        borderColor: hasData ? backgroundColors : ['#A9A9A9'], // Match border color with bar color
        borderWidth: 1,
      },
    ],
  };

  // Define chart options
  const chartOptions = {
    indexAxis: 'y', // Makes the chart horizontal
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Payment Count',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Payment Methods',
        },
      },
    },
  };

  return (
    <div className="relative h-[400px] min-h-[300px] w-full">
      {hasData ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <p className="text-center text-gray-500">No data available for payment counts.</p>
      )}
    </div>
  );
};

export default PaymentCountChart;
