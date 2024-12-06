import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PackageDetails = () => {
  const [loading, setLoading] = useState(true);
  const [packageDetails, setPackageDetails] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchData = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/backend/getPackages.php`,
        {
          headers: {
            "Package-Id": id,
          },
        }
      );
      console.log(response.data.data);

      if (response.data.status === 1) {
        setPackageDetails(response.data.data[0]);
      } else {
        setError("No details found for this package");
      }
    } catch (err) {
      setError("Failed to fetch details: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const goBackHandler = () => {
    navigate(-1);
    localStorage.getItem("activeTab");
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-200"
          onClick={goBackHandler}
        >
          Go Back
        </button>
        {error ? (
          <div>{error}</div>
        ) : (
          <div className="mt-6">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Package Details
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-lg font-medium text-gray-700">
                  Package Name:
                </p>
                <p className="text-lg text-gray-600">
                  {packageDetails.package_name}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-lg font-medium text-gray-700">Price:</p>
                <p className="text-lg text-gray-600">{packageDetails.price}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-lg font-medium text-gray-700">Facilities:</p>
                <p className="text-lg text-gray-600">
                  {packageDetails.facilities}
                </p>
              </div>

              <div className="space-y-2">
                <img
                  src={`http://localhost:3000/backend/${packageDetails.facilities_image}`}
                  alt="Facilities"
                  className="w-5/12 rounded-lg shadow-md"
                />
              </div>

              <div className="flex justify-between">
                <p className="text-lg font-medium text-gray-700">Duration:</p>
                <p className="text-lg text-gray-600">
                  {packageDetails.duration} days
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-lg font-medium text-gray-700">Meals:</p>
                <p className="text-lg text-gray-600">{packageDetails.meals}</p>
              </div>

              <div className="space-y-2">
                <img
                  src={`http://localhost:3000/backend/${packageDetails.meals_image}`}
                  alt="Meals"
                  className="w-5/12  rounded-lg shadow-md"
                />
              </div>

              <div className="flex justify-between">
                <p className="text-lg font-medium text-gray-700">
                  Destination Name:
                </p>
                <p className="text-lg text-gray-600">
                  {packageDetails.destination_name}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Tour Guide Profile
              </h2>

              <div className="flex items-center space-x-4">
                <img
                  src={`http://localhost:3000/backend/${packageDetails.guide_image}`}
                  alt="Tour Guide"
                  className="w-24 h-24 object-cover rounded-full border-2 border-gray-300 shadow-md"
                />
                <div>
                  <p className="text-lg font-medium text-gray-700">Name:</p>
                  <p className="text-lg text-gray-600">
                    {packageDetails.guide_name}
                  </p>

                  <p className="text-lg font-medium text-gray-700 mt-2">
                    Languages:
                  </p>
                  <p className="text-lg text-gray-600">
                    {packageDetails.language}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-lg font-medium text-gray-700">
                  Description:
                </p>
                <p className="text-lg text-gray-600">
                  {packageDetails.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageDetails;
