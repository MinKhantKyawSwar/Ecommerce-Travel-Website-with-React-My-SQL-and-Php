import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Recipts = () => {
  const [transactions, setTransactions] = useState([]);
  const {id} = useParams();

  const navigate = useNavigate();

  const getAllTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/backend/getTransactions.php`,
        {
            headers: {
              Recipt : id,
            },
          }
      );
      if (response.data.status === 1) {
        setTransactions(response.data.data[0]);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };
  useEffect(() => {
    getAllTransactions();
  }, []);
  return (
    <>
      <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Booking Receipt
        </h1>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold">Booking ID:</span>
            <span>{id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">User Name:</span>
            <span>{transactions.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Travel Date:</span>
            <span>{transactions.travel_date}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Created At:</span>
            <span>{transactions.created_at}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Number of People:</span>
            <span>{transactions.number_of_people}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Payment Method:</span>
            <span>{transactions.payment_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Total Price:</span>
            <span>${transactions.total_price}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">City:</span>
            <span>{transactions.city}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Country:</span>
            <span>{transactions.country}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Region:</span>
            <span>{transactions.region}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Add-ons:</span>
            <span>{transactions.add_on}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Discount:</span>
            <span>{transactions.discount}%</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Package Name:</span>
            <span>{transactions.package_name}</span>
          </div>
        </div>
        <button
          className="mt-6 w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
          onClick={() => window.print()}
        >
          Print Receipt
        </button>
      </div>
    </>
  );
};

export default Recipts;
