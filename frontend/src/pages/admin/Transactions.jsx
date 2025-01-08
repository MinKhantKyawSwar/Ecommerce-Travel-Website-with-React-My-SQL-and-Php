import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage, setTransactionsPerPage] = useState(6);
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

  // Calculate indices for current transactions
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  // Calculate total pages
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  // Pagination control
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  return (
    <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Transactions
      </h2>
      <hr className="mb-4 border-gray-300 dark:border-gray-700" />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">No</th>
              <th scope="col" className="px-6 py-3 text-center">Package</th>
              <th scope="col" className="px-6 py-3 text-center">User</th>
              <th scope="col" className="px-6 py-3 text-center">Travel Date</th>
              <th scope="col" className="px-6 py-3 text-center">Total People</th>
              <th scope="col" className="px-6 py-3 text-center text-green-500">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center transition duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => detailsHandler(transaction.booking_id)}
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {(index+1) + ((currentPage-1)*6)}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {transaction.package_name}
                </td>
                <td className="px-6 py-4">{transaction.username}</td>
                <td className="px-6 py-4">{transaction.travel_date}</td>
                <td className="px-6 py-4">{transaction.number_of_people}</td>
                <td className="px-6 py-4 font-semibold text-green-600 dark:text-green-400">
                  $ {transaction.total_price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <nav>
          <ul className="inline-flex -space-x-px">
            <li>
              <button
                onClick={() => paginate(currentPage - 1)}
                className={`px-3 py-2 ml-0 leading-tight text-sm bg-white border text-gray-900 font-semibold border-gray-300 rounded-l-lg hover:bg-gray-100 ${
                  currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-2 leading-tight text-sm text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 ${
                    currentPage === index + 1
                      ? "bg-gray-200 text-gray-900 font-bold"
                      : ""
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                className={`px-3 py-2 ml-0 leading-tight text-sm text-gray-900 font-semibold bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 ${
                  currentPage === totalPages
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Transactions;
