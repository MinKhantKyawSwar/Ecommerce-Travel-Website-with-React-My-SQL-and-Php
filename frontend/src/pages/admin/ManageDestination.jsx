import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { UserContext } from "../../providers/UserContext";

const ManageDestination = () => {
  const [destinations, setDestinations] = useState([]);
  const [packages, setPackages] = useState({});
  const [packageDetails, setPackgeDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openDetailsDropdown, setOpenDetailsDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [destinationPerPage, setDestinationPerPage] = useState(5); // Number of items per page
  const [currentDetailsPage, setCurrentDetailsPage] = useState(1); // Numbers of details per current page
  const [searchTerm, setSearchTerm] = useState("");

  const { setDestinationId } = useContext(UserContext);

  const navigate = useNavigate(); // Initialize useNavigate

  const getDestinations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getDestination.php"
      );

      if (response.data.status === 1) {
        setDestinations(response.data.data);
      } else {
        setError("No data found");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getPackageDetails = async (id) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getPackageDetails.php",
        {
          headers: {
            Package_Id: id,
          },
        }
      );

      if (response.data.status === 1) {
        setPackgeDetails(response.data.data);
      } else {
        setError("No data found");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getPackages = async (id) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getPackages.php",
        {
          headers: {
            "Destination-ID": id,
            Package: "",
          },
        }
      );
      if (response.data.status === 1) {
        // Store packages in the object with destination ID as key
        setPackages((prevPackages) => ({
          ...prevPackages,
          [id]: response.data.data,
        }));
      } else {
        setError("No data found");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteById = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/backend/getDestination.php`,
        {
          headers: {
            Destination_Id: id,
          },
        }
      );

      if (response.data.status === 1) {
        window.location.reload();
      } else {
        setError("Cannot delete this destination!");
      }
    } catch (err) {
      setError("Failed to fetch details: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Drop down for each table row
  const toggleDropdown = async (index, id) => {
    setOpenDropdown(openDropdown === index ? null : index);
    if (openDropdown !== index) {
      // Fetch packages only if they are not already fetched
      if (!packages[id]) {
        await getPackages(id);
      }
    }
  };

  const toggleDetailsDropdown = async (index, id) => {
    setOpenDetailsDropdown(openDetailsDropdown === index ? null : index);
    if (openDetailsDropdown !== index) {
      // Fetch packages only if they are not already fetched
      if (openDetailsDropdown !== index && !packages[id]) {
        await getPackageDetails(id);
      }
    }
  };

  const deletePackageById = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/backend/getPackages.php`,
        {
          headers: {
            "Package-Id": id,
          },
        }
      );

      if (response.data.status === 1) {
        window.location.reload();
      } else {
        setError("Cannot delete this package!");
      }
    } catch (err) {
      setError("Failed to fetch details: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deletePackageDetailsById = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/backend/getPackageDetails.php`,
        {
          headers: {
            "Package-Info-Id": id,
          },
        }
      );

      if (response.data.status === 1) {
        // window.location.reload();
      } else {
        setError("Cannot delete this package details!");
      }
    } catch (err) {
      setError("Failed to fetch details: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDestinations();
  }, []);

  //search function
  const filteredDestinations = destinations.filter(
    (destination) =>
      destination.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.region_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to page 1 after searching
  };

  //pagination for the whole page
  const indexOfLastDestination = currentPage * destinationPerPage;
  const indexOfFirstDestination = indexOfLastDestination - destinationPerPage;
  const currentDestinations = filteredDestinations.slice(
    indexOfFirstDestination,
    indexOfLastDestination
  );

  // Pagination controls with scroll-to-top
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredDestinations.length / destinationPerPage);
  //------------------------------------------------------------------

  const ITEMS_PER_PAGE = 5;

  // Calculate total pages
  const totalDetailsPages = Math.ceil(packageDetails.length / ITEMS_PER_PAGE);

  // Get the items to display based on the current page
  const currentItems = packageDetails.slice(
    (currentDetailsPage - 1) * ITEMS_PER_PAGE,
    currentDetailsPage * ITEMS_PER_PAGE
  );

  // Handle page change
  const goToPage = (page) => {
    if (page < 1 || page > totalDetailsPages) return; // Prevent invalid page
    setCurrentDetailsPage(page);
  };

  return (
    <>
      <div className="w-full p-6 flex flex-col gap-4 rounded-lg bg-white shadow-md">

        {/* Header Section */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Manage Destination
          </h2>

          {/* Add Button */}
          <button
            className="px-6 py-2 text-sm font-medium text-gray-800 border border-gray-800 rounded-lg shadow-sm hover:bg-gray-800 hover:text-white transition duration-200"
            onClick={() => navigate(`/admin/manage-destination`)}
          >
            Add Destination
          </button>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex items-center justify-center mt-6"
        >
          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              placeholder="🔍 Search by city, country, or region"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 text-gray-900 placeholder-gray-500 border rounded-lg shadow-sm focus:ring-gray-700 focus:border-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:placeholder-gray-400"
            />
          </div>
        </form>
      </div>

      {/* Divider */}
      <hr className="border-t border-gray-300" />

      {/* Content (optional section for extending later) */}
      <div className="text-gray-600">
        {/* Placeholder for additional content */}
      </div>

      <div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Destination Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Country
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Region
                  </th>
                  <th scope="col" className="flex justify-center py-3">
                    Action
                  </th>
                </tr>
            </thead>

            {currentDestinations.map((destination, index) => (
              <tbody key={index}>
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 cursor-pointer"
                  onClick={() =>
                    toggleDropdown(index, destination.destination_id)
                  }
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {destination.destination_id}
                  </th>
                  <td className="px-6 py-4">{destination.city}</td>
                  <td className="px-6 py-4">{destination.country}</td>
                  <td className="px-6 py-4">{destination.region_name}</td>
                  <td className="flex justify-center gap-4 py-4">
                    <button
                      onClick={() =>
                        navigate(`/destination/${destination.destination_id}`)
                      }
                      className="px-3 py-2 text-xs font-medium text-white bg-neutral-900 rounded-md hover:bg-black"
                    >
                      Details
                    </button>

                    <button
                      onClick={() =>
                        navigate(
                          `/admin/manage-destination/${destination.destination_id}`
                        )
                      }
                      className="px-5 py-2 text-xs font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteById(destination.destination_id)}
                      className="px-3 py-2 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                      Delete{" "}
                    </button>
                  </td>
                </tr>
                {openDropdown === index && (
                  <tr>
                    <td colSpan="5" className="bg-gray-100 rounded">
                      {openDropdown === index && (
                        <div className="bg-gray-100 rounded-lg shadow-md p-6">
                          <div className="flex gap-10">
                            <h3 className="font-semibold text-lg mb-4">
                              Packages
                            </h3>
                            <button
                              onClick={() => {
                                setDestinationId(destination.destination_id);
                                navigate(`/admin/manage-destination/packages/`);
                              }}
                              className="font-medium text-blue-600 hover:underline transition duration-200 mb-4"
                            >
                              Add package
                            </button>
                          </div>
                          <ul className="list-disc pl-5">
                            {packages[destination.destination_id]?.length >
                              0 ? (
                              packages[destination.destination_id].map(
                                (packageItem, packageIndex) => (
                                  <li
                                    key={packageIndex}
                                    className="py-4 border-b border-gray-300 transition duration-200 hover:bg-gray-200"
                                  >
                                    <div className="flex justify-between items-center hover:underline transition duration-200">
                                      <span
                                        className="font-medium text-gray-800 cursor-pointer"
                                        onClick={() =>
                                          toggleDetailsDropdown(
                                            packageIndex,
                                            packageItem.package_id
                                          )
                                        }
                                      >
                                        {packageItem.package_name}
                                      </span>
                                      <div className="flex gap-4 mr-28">
                                        <button
                                          onClick={() =>
                                            navigate(
                                              `/destination/${packageItem.destination}/package/${packageItem.package_id}`
                                            )
                                          }
                                          className="px-3 py-2 text-xs font-medium text-white bg-neutral-900 rounded-md hover:bg-black"
                                        >
                                          Details
                                        </button>
                                        <button
                                          onClick={() =>
                                            navigate(
                                              `/admin/manage-destination/packages/${packageItem.package_id}`
                                            )
                                          }
                                          className="px-5 py-2 text-xs font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                                        >
                                          Edit
                                        </button>
                                        <button
                                          onClick={() =>
                                            deletePackageById(
                                              packageItem.package_id
                                            )
                                          }
                                          className="px-3 py-2 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>

                                    {/* Toggleable package details */}
                                    {openDetailsDropdown === packageIndex && (
                                      <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
                                        <h4 className="font-semibold text-lg mb-4">
                                          Package Details
                                        </h4>
                                        <button
                                          className="w-full text-green-600 font-medium py-2 px-10 mt-4 rounded-lg border border-green-600 hover:bg-green-600 hover:text-white transition duration-200"
                                          onClick={() =>
                                            navigate(
                                              `/admin/manage-destination/packages/package-details/${packageItem.package_id}`
                                            )
                                          }
                                        >
                                          Add New Package Details
                                        </button>
                                        <ul className="list-none pl-0 mt-4">
                                          {currentItems.map(
                                            (packageData, index) => (
                                              <li
                                                key={index}
                                                className="bg-white rounded-lg mb-4 p-6 transition duration-200 hover:bg-gray-50"
                                              >
                                                <div className="flex justify-between items-start">
                                                  <div className="space-y-3">
                                                    <div className="text-xl font-semibold text-gray-800">
                                                      Package{" "}
                                                      {(currentDetailsPage -
                                                        1) *
                                                        5 +
                                                        index +
                                                        1}
                                                    </div>
                                                    <div className="text-gray-600">
                                                      <strong>
                                                        Start Location:
                                                      </strong>{" "}
                                                      {packageData.city}
                                                    </div>
                                                    <div className="text-gray-600">
                                                      <strong>Price:</strong> $
                                                      {packageData.price}
                                                    </div>
                                                    <div className="text-gray-600">
                                                      <strong>
                                                        Travel Date:
                                                      </strong>{" "}
                                                      {packageData.travel_date}
                                                    </div>
                                                    <div className="text-gray-600">
                                                      <strong>
                                                        Available People:
                                                      </strong>{" "}
                                                      {
                                                        packageData.number_of_available_people
                                                      }
                                                    </div>
                                                  </div>

                                                  {/* Action Buttons on the right */}
                                                  <div className="flex flex-row justify-start gap-2">
                                                    <button
                                                      onClick={() =>
                                                        navigate(
                                                          `/admin/manage-destination/packages/manage-package-details/${packageData.package_info_id}`
                                                        )
                                                      }
                                                      className="px-5 py-2 text-xs font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                                                    >
                                                      Edit
                                                    </button>
                                                    <button
                                                      onClick={() =>
                                                        deletePackageDetailsById(
                                                          packageData.package_info_id
                                                        )
                                                      }
                                                      className="px-3 py-2 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                                                    >
                                                      Delete
                                                    </button>
                                                  </div>
                                                </div>
                                              </li>
                                            )
                                          )}
                                        </ul>

                                        {/* Pagination Controls */}
                                        <div className="flex justify-center items-center space-x-2 mt-6">
                                          <button
                                            onClick={() =>
                                              goToPage(currentDetailsPage - 1)
                                            }
                                            disabled={currentDetailsPage === 1}
                                            className="px-4 py-2 bg-gray-300 text-gray-600 rounded-md disabled:opacity-50"
                                          >
                                            Previous
                                          </button>
                                          <span className="text-gray-800">
                                            Page {currentDetailsPage} of{" "}
                                            {totalDetailsPages}
                                          </span>
                                          <button
                                            onClick={() =>
                                              goToPage(currentDetailsPage + 1)
                                            }
                                            disabled={
                                              currentDetailsPage ===
                                              totalDetailsPages
                                            }
                                            className="px-4 py-2 bg-gray-300 text-gray-600 rounded-md disabled:opacity-50"
                                          >
                                            Next
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </li>
                                )
                              )
                            ) : (
                              <p className="text-gray-500">
                                No packages available
                              </p>
                            )}
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            ))}
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 mb-4">
            <nav>
              <ul className="inline-flex -space-x-px">
                <li>
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    className={`px-3 py-2 ml-0 leading-tight text-sm text-gray-900 font-semibold bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                      }`}
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
                      className={`px-3 py-2 leading-tight text-sm text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 ${currentPage === index + 1
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
      </div>
    </>
  );
};

export default ManageDestination;
