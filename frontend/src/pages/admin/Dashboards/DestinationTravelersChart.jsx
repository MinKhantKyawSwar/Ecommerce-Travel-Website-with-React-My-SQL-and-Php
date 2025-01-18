import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DestinationTravelersChart = ({ destinationData }) => {
  // Prepare data for the chart
  const chartData = {
    labels: destinationData.map((item) => item.label), // Use 'label' from the backend response
    datasets: [
      {
        label: 'Travelers',
        data: destinationData.map((item) => item.value), // Use 'value' for number of travelers
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'], // Adjust the colors
        hoverOffset: 10,
      },
    ],
  };

  // Define options to position the label on the left
  const chartOptions = {
    plugins: {
      legend: {
        position: 'right', // Set position of the legend to the left
        align: 'between',   // Align the legend to the start (left) of the chart
      },
    },
  };

  return (
    <div className="relative h-[400px] min-h-[300px] overflow-hidden w-full ml-[25%] ">
      <Doughnut data={chartData} options={chartOptions}/>
    </div>
  );
};

export default DestinationTravelersChart;
