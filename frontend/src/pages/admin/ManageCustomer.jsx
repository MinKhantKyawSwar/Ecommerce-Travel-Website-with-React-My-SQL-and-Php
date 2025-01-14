import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation

const ManageCustomer = () => {
  const [customers, setCustomers] = useState([]);
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
      } else {
        setError("No data found");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    } finally {
      setLoading(false);
    }
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
        // Update the customer status in the local state
        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer.user_id === userId
              ? { ...customer, status: currentStatus === "approved" ? "ban" : "approved" }
              : customer
          )
        );
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
        });
      } else {
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("An error occurred while updating the status.", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
      });
    }
  };


  useEffect(() => {
    getAllCustomerInfo();
  }, []);

  // Calculate the index of the first and last customer for the current page
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  // Pagination controls with scroll-to-top
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  // Calculate total pages
  const totalPages = Math.ceil(customers.length / customersPerPage);

  return (
    <>
      <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md">
        <h2 className="text-lg font-semibold mb-2">All Customers</h2>
        <div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-center text-gray-500 dark:text-gray-400 border-collapse">
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
                    {/* Customer ID */}
                    <th
                      scope="row"
                      className="w-20 px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                    >
                      {customer.user_id}
                    </th>

                    {/* Profile Image */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <img
                          src={`http://localhost:3000/backend/${customer.profile_image}`}
                          alt="profile_image"
                          className="rounded-full w-10 h-10 border-2 object-cover"
                        />
                      </div>
                    </td>

                    {/* Username and Email */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {customer.username}
                        </span>
                        <span className="text-sm text-gray-500">{customer.email}</span>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-4">
                      <span className="inline-block px-2 py-1 text-xs font-medium text-neutral-900 bg-neutral-100 rounded-full dark:bg-neutral-700 dark:text-blue-100">
                        {customer.role}
                      </span>
                    </td>

                    {/* Action Buttons */}
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
                          className={`px-3 py-2 text-xs font-medium text-white ${customer.status === "ban" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"} rounded-md`}
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
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <nav>
            <ul className="inline-flex -space-x-px">
              <li>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  className={`px-3 py-2 ml-0 leading-tight text-sm text-gray-900 font-semibold bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}`}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, index) => (
                <li key={index}>
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`px-3 py-2 leading-tight text-sm text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 ${currentPage === index + 1 ? "bg-gray-200 text-gray-900 font-semibold" : ""}`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  className={`px-3 py-2 ml-0 leading-tight text-sm text-gray-900 font-semibold bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}`}
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

export default ManageCustomer;
