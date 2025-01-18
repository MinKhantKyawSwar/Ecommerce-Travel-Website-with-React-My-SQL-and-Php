import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DestinationTravelersChart = ({ destinationData }) => {
    console.log(destinationData)
  // Prepare data for the chart
  const chartData = {
    labels: destinationData.map((item) => item.destination), // Replace 'destination' with your actual data key
    datasets: [
      {
        label: 'Travelers per Destination',
        data: destinationData.map((item) => item.travelers), // Replace 'travelers' with your actual data key
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'], // You can adjust the colors
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="relative h-[400px] min-h-[300px] overflow-hidden">
      <Doughnut data={chartData} />
    </div>
  );
};

export default DestinationTravelersChart;
