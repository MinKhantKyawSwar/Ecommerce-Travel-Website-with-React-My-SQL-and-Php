import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageGuide = () => {
  const [guides, setGuides] = useState([]);
  const [filteredGuides, setFilteredGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [guidesPerPage, setGuidePerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();

  const getAllGuide = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getGuideInfo.php"
      );
      if (response.data.status === 1) {
        setGuides(response.data.data);
        setFilteredGuides(response.data.data); // Initialize filtered guides
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

  // Filter guides based on the search query
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = guides.filter((guide) =>
      guide.guide_name.toLowerCase().includes(query)
    );
    setFilteredGuides(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  // Calculate the index of the first and last guide for the current page
  const indexOfLastGuide = currentPage * guidesPerPage;
  const indexOfFirstGuide = indexOfLastGuide - guidesPerPage;
  const currentGuides = filteredGuides.slice(indexOfFirstGuide, indexOfLastGuide);

  // Pagination controls
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to the top when page changes
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredGuides.length / guidesPerPage);

  return (
    <>
      <div className="w-full p-6 flex flex-col gap-4 rounded-lg bg-white shadow-md">
        {/* Header Section */}
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          {/* Header Section */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Manage Guide
            </h2>

            {/* Add Button */}
            <button
              className="px-6 py-2 text-sm font-medium text-gray-800 border border-gray-800 rounded-lg shadow-sm hover:bg-gray-800 hover:text-white transition duration-200"
              onClick={() => navigate(`/admin/manage-guide`)}
            >
              Add Guide
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mt-6">
            <input
              type="text"
              placeholder="🔍 Search by name..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-2 text-gray-900 placeholder-gray-500 border rounded-lg shadow-sm focus:ring-gray-700 focus:border-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:placeholder-gray-400"
            />
          </div>
        </div>


        {/* Divider */}
        <hr className="border-t border-gray-300" />

        {/* Guides Table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {/* Setting fixed widths and centering the content */}
                <th scope="col" className="px-8 py-3 w-20 text-center">
                  Id
                </th>
                <th scope="col" className="px-8 py-3 w-40 text-center">
                  Profile
                </th>
                <th scope="col" className="px-8 py-3 w-60 text-start">
                  Name
                </th>
                <th scope="col" className="px-28 py-3 w-32 text-center">
                  Action
                </th>
              </tr>
            </thead>
            {currentGuides.map((guide, index) => (
              <tbody key={index}>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-8 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-20 text-center"
                  >
                    {guide.guide_id}
                  </th>
                  <td className="px-8 py-4 w-40 text-center">
                    <img
                      src={`http://localhost:3000/backend/${guide.guide_image}`}
                      alt="guide profile image"
                      className="rounded-full w-14 h-14 border-2 object-cover mx-auto"
                    />
                  </td>
                  <td className="px-8 py-4 w-60">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {guide.guide_name}
                      </span>
                      <span className="text-sm text-gray-500">{guide.email}</span>
                    </div>
                  </td>
                  <td className="flex w-full gap-4 px-8 py-4 justify-center ">
                    <button
                      onClick={() =>
                        navigate(`/admin/manage-guide/${guide.guide_id}`)
                      }
                      className="px-4 py-2 text-xs font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteGuideById(guide.guide_id)}
                      className="px-4 py-2 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
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
                  className={`px-3 py-2 ml-0 leading-tight text-sm text-gray-900 font-semibold bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
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

export default ManageGuide;
