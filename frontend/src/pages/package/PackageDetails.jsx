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
    const package_id = Number(id);
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/backend/getPackages.php`,
        {
          headers: {
            "Package-Id": package_id,
          },
        }
      );

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

  const handleBooking = async (id) => {
    navigate(`/booking/${id}`);
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
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Image Container */}
              <div className="col-span-2 relative">
                <div className="relative w-full h-full">
                  <img
                    src={`http://localhost:3000/backend/${packageDetails.destination_image}`}
                    alt={packageDetails.city}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>
                <div className="absolute w-full bottom-20 bg-opacity-90 px-4 py-3 ">
                  <h2 className="text-3xl font-extrabold text-white tracking-wide">
                    {packageDetails.package_name}
                  </h2>
                  <h2 className="text-3xl font-semibold text-gray-800 mb-4"></h2>
                  <button
                    className="btn btn-ghost w-full border-green-500 text-green-500 px-3 rounded hover:bg-green-500 hover:text-white transition"
                    onClick={() => handleBooking(id)}
                  >
                    Book Package
                  </button>
                </div>
              </div>

              {/* Details Container */}
              <div className="col-span-3">
                <div className="space-y-4">
                  <div className="flex flex-col ">
                    <div className="flex justify">
                      <p className="text-gray-600 tracking-wider">
                        for {packageDetails.duration} days /{" "}
                        {packageDetails.duration - 1} nights
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-lg font-medium text-gray-700">Price:</p>
                    <p className="text-lg text-gray-600">
                      {packageDetails.price}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-lg font-medium text-gray-700">
                      Facilities:
                    </p>
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
                    <p className="text-lg font-medium text-gray-700">Meals:</p>
                    <p className="text-lg text-gray-600">
                      {packageDetails.meals}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <img
                      src={`http://localhost:3000/backend/${packageDetails.meals_image}`}
                      alt="Meals"
                      className="w-5/12 rounded-lg shadow-md"
                    />
                  </div>

                  <div className="flex justify-between">
                    <p className="text-lg font-medium text-gray-700">
                      Destination Name:
                    </p>
                    <p className="text-lg text-gray-600">
                      {packageDetails.city}
                    </p>
                  </div>
                </div>
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
                  <p className="text-lg font-medium text-gray-700">Email:</p>
                  <p className="text-lg text-gray-600">
                    {packageDetails.email}
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
                  {packageDetails.guide_description}
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
