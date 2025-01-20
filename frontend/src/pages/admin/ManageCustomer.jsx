import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]); // For filtered results
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [customersPerPage] = useState(10); // Number of customers per page
  const navigate = useNavigate();

  const getAllCustomerInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getUserInfo.php"
      );

      if (response.data.status === 1) {
        const sortedCustomers = response.data.data.sort((a, b) => {
          if (a.role < b.role) return -1;
          if (a.role > b.role) return 1;
          return 0;
        });
        setCustomers(sortedCustomers);
        setFilteredCustomers(sortedCustomers); // Initialize filtered customers
      } else {
        setError("No data found");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = customers.filter(
      (customer) =>
        customer.username.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query)
    );
    setFilteredCustomers(filtered);
    setCurrentPage(1); // Reset to the first page
  };

  const banHandler = async (userId, currentStatus) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/backend/toggleStatus.php",
        { user_id: userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === 1) {
        setFilteredCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer.user_id === userId
              ? { ...customer, status: currentStatus === "approved" ? "ban" : "approved" }
              : customer
          )
        );
      }
    } catch (error) {
      console.error("An error occurred while updating the status.", error);
    }
  };

  useEffect(() => {
    getAllCustomerInfo();
  }, []);

  // Calculate the index of the first and last customer for the current page
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  // Pagination controls
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  return (
    <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md">
      <div className="flex items-center justify-between mb-4">
        {/* Header Title */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          All Customers
        </h2>

        {/* Search Bar */}
        <div className="w-full md:w-1/3">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="🔍 Search by username or email..."
            className="w-full px-4 py-2 border rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:ring-gray-700 focus:border-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:placeholder-gray-400 dark:focus:ring-gray-500"
          />
        </div>
      </div>


      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="w-20 px-3 py-3 text-center">Id</th>
              <th scope="col" className="px-6 py-3 text-center">Profile</th>
              <th scope="col" className="px-6 py-3">User</th>
              <th scope="col" className="px-6 py-3">Role</th>
              <th scope="col" className="px-7 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <th
                  scope="row"
                  className="w-20 px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                >
                  {customer.user_id}
                </th>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center">
                    <img
                      src={`http://localhost:3000/backend/${customer.profile_image}`}
                      alt="profile_image"
                      className="rounded-full w-10 h-10 border-2 object-cover"
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {customer.username}
                    </span>
                    <span className="text-sm text-gray-500">{customer.email}</span>
                  </div>
                </td>
                <td className="py-4">
                  <span className="inline-block px-2 py-1 text-xs font-medium text-neutral-900 bg-neutral-100 rounded-full dark:bg-neutral-700 dark:text-blue-100">
                    {customer.role}
                  </span>
                </td>
                <td className="text-center py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/customerDetails/${customer.user_id}`)}
                      className="px-3 py-2 text-xs font-medium text-white bg-neutral-900 rounded-md hover:bg-black"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => banHandler(customer.user_id, customer.status)}
                      className={`px-3 py-2 text-xs font-medium text-white ${customer.status === "ban"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                        } rounded-md`}
                    >
                      {customer.status === "ban" ? "Unban" : "Ban"}
                    </button>
                  </div>
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
                className={`px-3 py-2 text-sm text-gray-900 font-semibold bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
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
                  className={`px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 ${currentPage === index + 1
                    ? "bg-gray-200 text-gray-900 font-semibold"
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
                className={`px-3 py-2 text-sm text-gray-900 font-semibold bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
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

export default ManageCustomer;
