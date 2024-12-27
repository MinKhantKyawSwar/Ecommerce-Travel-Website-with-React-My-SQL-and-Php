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

  return (
    <>
      <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md">
        <h2 className="text-lg font-semibold mb-2">Manage Destination</h2>
        <hr />
      </div>
      <div>
        <div className="flex gap-10 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md mt-4">
          <button
            className="w-full text-green-600 font-medium py-2 px-10 mt-4 rounded-lg border border-green-600 hover:bg-green-600 hover:text-white transition duration-200"
            onClick={() => navigate(`/admin/manage-destination`)}
          >
            Add
          </button>
        </div>
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

            {destinations.map((destination, index) => (
              <tbody key={index}>
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200"
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
                  <td className="flex gap-4 py-4">
                    <button
                      onClick={() =>
                        navigate(`/destination/${destination.destination_id}`)
                      }
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Details
                    </button>

                    <button
                      onClick={() =>
                        navigate(
                          `/admin/manage-destination/${destination.destination_id}`
                        )
                      }
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteById(destination.destination_id)}
                      className="font-medium text-red-600 dark:text-blue-500 hover:underline"
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
                          <h3 className="font-semibold text-lg mb-4">
                            Packages
                          </h3>
                          <button
                            onClick={() => {
                              setDestinationId(destination.destination_id);
                              navigate(`/admin/manage-destination/packages/`);
                            }}
                            className="font-medium text-blue-600 hover:underline transition duration-200"
                          >
                            Add package
                          </button>
                          <ul className="list-disc pl-5">
                            {packages[destination.destination_id]?.length >
                            0 ? (
                              packages[destination.destination_id].map(
                                (packageItem, packageIndex) => (
                                  <li
                                    key={packageIndex}
                                    className="py-4 border-b border-gray-300 transition duration-200 hover:bg-gray-200"
                                    onClick={() =>
                                      toggleDetailsDropdown(
                                        packageIndex,
                                        packageItem.package_id
                                      )
                                    }
                                  >
                                    <div className="flex justify-between items-center hover:underline transition duration-200">
                                      <span className="font-medium text-gray-800">
                                        {packageItem.package_name}
                                      </span>
                                      <div className="flex gap-4">
                                        <button
                                          onClick={() =>
                                            navigate(
                                              `/destination/${packageItem.destination}/package/${packageItem.package_id}`
                                            )
                                          }
                                          className="font-medium text-blue-600 hover:underline transition duration-200"
                                        >
                                          Details
                                        </button>

                                        <button
                                          onClick={() =>
                                            navigate(
                                              `/admin/manage-destination/packages/${packageItem.package_id}`
                                            )
                                          }
                                          className="font-medium text-blue-600 hover:underline transition duration-200"
                                        >
                                          Edit
                                        </button>
                                        <button
                                          onClick={() =>
                                            deletePackageById(
                                              packageItem.package_id
                                            )
                                          }
                                          className="font-medium text-red-600 hover:underline transition duration-200"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                    {/* Toggleable package details */}

                                    {openDetailsDropdown === packageIndex && (
                                      <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
                                        <h4 className="font-semibold text-lg">
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
                                        <ul className="list-disc pl-5">
                                          {packageDetails.map(
                                            (packageData, index) => (
                                              <li key={index} className="py-2">
                                                <div>
                                                  <div className="font-medium text-gray-800">
                                                    Packge {index + 1}
                                                  </div>
                                                  <div className="text-gray-600">
                                                    Start Location:{" "}
                                                    {packageData.city}
                                                  </div>
                                                  <div className="text-gray-600">
                                                    Price: ${packageData.price}
                                                  </div>
                                                  <div className="text-gray-600">
                                                    Travel Date:{" "}
                                                    {packageData.travel_date}
                                                  </div>
                                                  <div className="text-gray-600">
                                                    Available People:{" "}
                                                    {
                                                      packageData.number_of_available_people
                                                    }
                                                  </div>
                                                </div>
                                                <div className="flex gap-4">
                                                  <button
                                                    onClick={() =>
                                                      navigate(
                                                        `/admin/manage-destination/packages/manage-package-details/${packageData.package_info_id}`
                                                      )
                                                    }
                                                    className="font-medium text-blue-600 hover:underline transition duration-200"
                                                  >
                                                    Edit
                                                  </button>
                                                  <button
                                                    onClick={() =>
                                                      deletePackageDetailsById(
                                                        packageData.package_info_id
                                                      )
                                                    }
                                                    className="font-medium text-red-600 hover:underline transition duration-200"
                                                  >
                                                    Delete
                                                  </button>
                                                </div>
                                              </li>
                                            )
                                          )}
                                        </ul>
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
        </div>
      </div>
    </>
  );
};

export default ManageDestination;
