import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  const getAllTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/backend/getTransactions.php`
      );
      if (response.data.status === 1) {
        setTransactions(response.data.data);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const detailsHandler = (id) => {
    navigate(`/recipts/${id}`);
  };

  useEffect(() => {
    getAllTransactions();
  }, []);

  return (
    <>
      <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md">
        <h2 className="text-lg font-semibold mb-2">Transactions</h2>
        <hr />
      </div>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-8 py-4 text-center">
                  Package
                </th>
                <th scope="col" className="px-8 py-4 text-center">
                  user
                </th>
                <th scope="col" className="px-8 py-4 text-center">
                  Travel Date
                </th>
                <th scope="col" className="px-8 py-4 text-center">
                  Total People
                </th>
                <th
                  scope="col"
                  className="flex justify-center py-4 px-8 text-center"
                >
                  Total Price
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center transition duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={(_)=>detailsHandler(transaction.booking_id)}
                >
                  <td className="px-8 py-6">{transaction.package_name}</td>

                  <td className="px-8 py-6">
                    {/* <img
                      src={`http://localhost:3000/backend/${transaction.profile_image}`}
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-2" // Adjust size as needed
                    /> */}
                    {transaction.username}
                  </td>

                  <td className="px-8 py-6">{transaction.travel_date}</td>
                  <td className="px-8 py-6">{transaction.number_of_people}</td>
                  <td className="px-8 py-6">$ {transaction.total_price}</td>
                  <td className="px-8 py-6"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Transaction;
