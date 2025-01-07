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
        <h2 className="text-lg font-semibold mb-2">Manage Customers</h2>
        <div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Customer Id</th>
                  <th scope="col" className="px-6 py-3">Profile</th>
                  <th scope="col" className="px-6 py-3">UserName</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                  <th scope="col" className="px-6 py-3">Role</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              {currentCustomers.map((customer, index) => (
                <tbody key={index}>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {customer.user_id}
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        src={`http://localhost:3000/backend/${customer.profile_image}`}
                        alt="profile_image"
                        className="rounded-full w-10 h-10 border-2 object-cover"
                      />
                    </th>
                    <td className="px-6 py-4">{customer.username}</td>
                    <td className="px-6 py-4">{customer.email}</td>
                    <td className="px-6 py-4">{customer.role}</td>
                    <td className="flex gap-4 px-6 py-6">
                      <button
                        onClick={() =>
                          navigate(`/destination/${customer.destination_id}`)
                        } // Navigate to the destination details page
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Details
                      </button>
                      <a
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Ban
                      </a>
                    </td>
                  </tr>
                </tbody>
              ))}
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
