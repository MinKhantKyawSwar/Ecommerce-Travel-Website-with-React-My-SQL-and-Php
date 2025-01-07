import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageGuide = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [guidesPerPage,setGuidePerPage] = useState(10); // Number of guides per page
  const navigate = useNavigate();

  const getAllGuide = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getGuideInfo.php"
      );
      if (response.data.status === 1) {
        setGuides(response.data.data);
      } else {
        setError("No data found");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteGuideById = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/backend/getGuideInfo.php`,
        {
          headers: {
            "Guide-Id": id,
          },
        }
      );

      if (response.data.status === 1) {
        window.location.reload();
      } else {
        setError("Cannot delete this Guide Information!");
      }
    } catch (err) {
      setError("Failed to fetch details: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllGuide();
  }, []);

  // Calculate the index of the first and last guide for the current page
  const indexOfLastGuide = currentPage * guidesPerPage;
  const indexOfFirstGuide = indexOfLastGuide - guidesPerPage;
  const currentGuides = guides.slice(indexOfFirstGuide, indexOfLastGuide);

  // Pagination controls
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to the top when page changes
  };

  // Calculate total pages
  const totalPages = Math.ceil(guides.length / guidesPerPage);

  return (
    <>
      <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md">
        <h2 className="text-lg font-semibold mb-2">Manage Guide</h2>
        <hr />
      </div>
      <div>
        <div className="flex gap-10 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md mt-4">
          <button
            className="w-full text-green-600 font-medium py-2 px-10 mt-4 rounded-lg border border-green-600 hover:bg-green-600 hover:text-white transition duration-200"
            onClick={() => navigate(`/admin/manage-guide`)}
          >
            Add
          </button>
        </div>
        <div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Id</th>
                  <th scope="col" className="px-6 py-3">Profile</th>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              {currentGuides.map((guide, index) => (
                <tbody key={index}>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {guide.guide_id}
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        src={`http://localhost:3000/backend/${guide.guide_image}`}
                        alt="guide profile image"
                        className="rounded-full w-10 h-10 border-2 object-cover"
                      />
                    </th>
                    <td className="px-6 py-4">{guide.guide_name}</td>
                    <td className="px-6 py-4">{guide.email}</td>
                    <td className="flex gap-4 px-6 py-6">
                      <button
                        onClick={() =>
                          navigate(`/admin/manage-guide/${guide.guide_id}`)
                        }
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          deleteGuideById(guide.guide_id)
                        }
                        className="font-medium text-red-600 hover:underline transition duration-200"
                      >
                        Delete
                      </button>
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
                  className={`px-3 py-2 ml-0 leading-tight text-sm  bg-white border text-gray-900 font-semibold border-gray-300 rounded-l-lg hover:bg-gray-100 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}`}
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
                    className={`px-3 py-2 leading-tight text-sm text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 ${currentPage === index + 1 ? "bg-gray-200 text-gray-900 font-bold" : ""}`}
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

export default ManageGuide;
