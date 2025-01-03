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

  const handleDetails = (id) => {
    navigate(`package/${id}`);
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
                <div className="absolute w-full bottom-5 bg-opacity-90 px-4 py-3 ">
                  <h2 className="text-3xl font-extrabold text-white tracking-wide">
                    {packageDetails.package_name}
                  </h2>
                  <p className="text-lg font-medium text-white">{packageDetails.city} ( {packageDetails.country} )</p>
                  <p className="text-4xl font-semibold tracking-wider text-green-400">
                    $ {packageDetails.price}.00
                  </p>
                  <h2 className="text-3xl font-semibold text-gray-800 mb-4"></h2>
                  <div className="space-y-3">
                    <button
                      className=" w-full text-sm font-semibold border-green-500 hover:bg-green-500 bg-green-600 text-white px-3 py-2 rounded transition duration-300"
                      onClick={() => handleBooking(id)}
                    >
                      Book Package
                    </button>
                  </div>
                </div>
              </div>

              {/* Details Container */}
              <div className="col-span-3 bg-white p-6 rounded-lg shadow-lg space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <p className="text-2xl font-bold text-gray-900">
                      Accommodation
                    </p>
                    <p className="text-gray-600 tracking-wide mt-1">
                      for {packageDetails.duration} days /{" "}
                      {packageDetails.duration - 1} nights
                    </p>
                  </div>

                  <div className="flex items-center space-x-6">
                    <img
                      src={`http://localhost:3000/backend/${packageDetails.facilities_image}`}
                      alt="Facilities"
                      className="w-6/12 rounded-lg shadow-md object-cover"
                    />
                    <p className="text-base text-gray-600 leading-relaxed">
                      {packageDetails.facilities}
                    </p>
                  </div>

                  <div className="flex items-center space-x-6">
                    <p className="text-lg font-medium text-gray-700">Meals:</p>
                    <p className="text-base text-gray-600">
                      {packageDetails.meals}
                    </p>
                  </div>
                  <img
                    src={`http://localhost:3000/backend/${packageDetails.meals_image}`}
                    alt="Meals"
                    className="w-full rounded-lg shadow-md object-cover"
                  />

                  <div className="flex items-center justify-between border-t pt-4 mt-4">
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
