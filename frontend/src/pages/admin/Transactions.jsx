import axios from "axios";
import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage, setTransactionsPerPage] = useState(6);
  const [loading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);
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

  // Filtered transactions based on search query
  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.package_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.travel_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.booking_status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate indices for current transactions
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  // Pagination control
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  const transactionHandler = async (email, id, booking_id, status) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/backend/getTransactions.php`,
        { "booking_id": booking_id, "user_id": Number(id), "booking_status": status, "email": email }
      );
      if (response.data.status === 1) {
        toast.success(`Successfully ${status}`, {
          position: "top-center",
          autoClose: 2000,
          theme: "light",
        });
        setReload(!reload);
      } else {
        toast.error(response.data.message || "Operation failed", {
          position: "top-center",
          autoClose: 2000,
          theme: "light",
        });
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllTransactions();
  }, [reload]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md">
        <div className="w-full mb-4 flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Transactions
          </h2>

          {/* Search Bar */}
          <div className="mb-4 flex justify-center">
            <input
              type="text"
              placeholder="🔍 Search by package name, username, or date"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-2/3 px-4 py-2 text-gray-900 placeholder-gray-500 border rounded-lg shadow-sm focus:ring-gray-700 focus:border-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:placeholder-gray-400"
            />
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3 text-center">No</th>
                <th className="px-6 py-3 text-center">Package</th>
                <th className="px-6 py-3 text-center">User</th>
                <th className="px-6 py-3 text-center">Travel Date</th>
                <th className="px-6 py-3 text-center">Total People</th>
                <th className="px-6 py-3 text-center text-green-500">Total Price</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((transaction, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center transition duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {index + 1 + (currentPage - 1) * 6}
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
                  {transaction.booking_status === "pending" && (
                    <td className="flex flex-row justify-center gap-2 px-6 py-4 font-semibold">
                      <button
                        onClick={() => detailsHandler(transaction.booking_id)}
                        className="px-2 py-2 text-xs font-medium text-white bg-black rounded-md hover:bg-gray-800"
                      >
                        Details
                      </button>
                      {
                        !loading && (
                          <button
                            onClick={() =>
                              transactionHandler(transaction.email, transaction.user_id, transaction.booking_id, "approved")
                            }
                            className="px-2 py-2 text-xs text-center font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                          >
                            Approve
                          </button>
                        )
                      }
                      {loading && (
                        <div className="px-6 py-2 text-xs text-center font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
                          <TailSpin
                            visible={true}
                            height="17"
                            width="17"
                            color="#ffffff"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass=""
                          />
                        </div>
                      )}
                      {
                        !loading && (
                          <button
                            onClick={() =>
                              transactionHandler(transaction.email, transaction.user_id, transaction.booking_id, "denied")
                            }
                            className="px-3 py-2 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                          >
                            Deny
                          </button>
                        )
                      }
                      {loading && (
                        <div className="px-4 py-2 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
                          <TailSpin
                            visible={true}
                            height="17"
                            width="17"
                            color="#ffffff"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass=""
                          />
                        </div>
                      )}
                    </td>
                  )}
                  {transaction.booking_status === "approved" && (
                    <td className="flex flex-row justify-start gap-2 px-6 py-4 font-semibold">
                      <button
                        onClick={() => detailsHandler(transaction.booking_id)}
                        className="px-2 py-2 text-xs font-medium text-white bg-black rounded-md hover:bg-gray-800"
                      >
                        Details
                      </button>
                      <p
                        className="px-2 py-2 text-xs font-medium text-white bg-green-600 rounded-md"
                      >
                        Approved
                      </p>
                    </td>
                  )}

                  {transaction.booking_status === "denied" && (
                    <td className="flex flex-row justify-start gap-2 px-6 py-4 font-semibold">
                      <button
                        onClick={() => detailsHandler(transaction.booking_id)}
                        className="px-2 py-2 text-xs font-medium text-white bg-black rounded-md hover:bg-gray-800"
                      >
                        Details
                      </button>
                      <p
                        className="px-2 py-2 text-xs font-medium text-white bg-red-600 rounded-md"
                      >
                        denied
                      </p>
                    </td>
                  )}
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
                  className={`px-3 py-2 ml-0 leading-tight text-sm bg-white border text-gray-900 font-semibold border-gray-300 rounded-l-lg hover:bg-gray-100 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
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
                    className={`px-3 py-2 leading-tight text-sm text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 ${currentPage === index + 1
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
                  className={`px-3 py-2 ml-0 leading-tight text-sm text-gray-900 font-semibold bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 ${currentPage === totalPages
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
    </>
  );

};

export default Transactions;
