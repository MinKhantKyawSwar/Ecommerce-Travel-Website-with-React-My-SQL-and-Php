import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { UserContext } from "../../providers/UserContext";

const ManageDestination = () => {
  const [destinations, setDestinations] = useState([]);
  const [packages, setPackages] = useState({}); // Change to an object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
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

  const getPackages = async (id) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getPackages.php",
        {
          headers: {
            "Destination-ID": id,
            "Package" : ""
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
        setError("Cannot delete this destination!");
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
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
                        toggleDropdown(index, destination.destination_id)
                      }
                    >
                      {openDropdown === index ? (
                        <p className="font-medium text-blue-600 hover:underline">
                          {"Hide"}
                        </p>
                      ) : (
                        <p className="font-medium text-blue-600 hover:underline">
                          {"Packages"}
                        </p>
                      )}
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
                              setDestinationId(destination.destination_id)
                              navigate(
                                `/admin/manage-destination/packages/`
                              );
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
                                  >
                                    <div className="flex justify-between items-center">
                                      <span className="font-medium text-gray-800">
                                        {packageItem.package_name} ($
                                        {packageItem.price})
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
