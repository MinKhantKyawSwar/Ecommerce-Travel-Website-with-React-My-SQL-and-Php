import axios from "axios";
import React, { useEffect, useState } from "react";

const Explore = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  // Fetch all destinations
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

  const uniqueCountries = Array.from(
    new Set(destinations.map((destination) => destination.country))
  );
  const uniqueCities = Array.from(
    new Set(destinations.map((destination) => destination.destination_name))
  );

  const handleCountryCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedCountries((prev) => [...prev, name]);
    } else {
      setSelectedCountries((prev) =>
        prev.filter((country) => country !== name)
      );
    }
  };

  const handleCityCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedCities((prev) => [...prev, name]);
    } else {
      setSelectedCities((prev) =>
        prev.filter((city) => city !== name)
      );
    }
  };

  useEffect(() => {
    getDestinations();
  }, []);

  const filteredDestinations = destinations.filter((destination) => {
    const matchesCountry = selectedCountries.length === 0 || selectedCountries.includes(destination.country);
    const matchesCity = selectedCities.length === 0 || selectedCities.includes(destination.destination_name);
    return matchesCountry && matchesCity;
  });

  return (
    <>
      <div>
        <p>Find your Dream Destination Here!</p>
        search bar
      </div>
      <div className="w-full flex gap-7">
        <div className="w-1/3 px-2 py-4">
          <div>
            <p className="mb-5 font-medium text-2xl">Countries</p>
            <form>
              <div className="flex flex-wrap">
                {uniqueCountries.map((country, index) => (
                  <div key={index} className="flex items-center mb-2 w-1/2">
                    <input
                      type="checkbox"
                      id={`country-${index}`}
                      name={country}
                      onChange={handleCountryCheckboxChange}
                      className="mr-2"
                    />
                    <label
                      htmlFor={`country-${index}`}
                      className="text-gray-800"
                    >
                      {country}
                    </label>
                  </div>
                ))}
              </div>
            </form>
          </div>
          <div className="px-2 py-4">
          <p className="mb-5 font-medium text-2xl">Cities</p>
            <form>
              <div className="flex flex-wrap">
                {uniqueCities.map((city, index) => (
                  <div key={index} className="flex items-center mb-2 w-1/2">
                    <input
                      type="checkbox"
                      id={`city-${index}`}
                      name={city}
                      onChange={handleCityCheckboxChange}
                      className="mr-2"
                    />
                    <label htmlFor={`city-${index}`} className="text-gray-800">
                      {city}
                    </label>
                  </div>
                ))}
              </div>
            </form>
          </div>
        </div>

        <div className="w-2/3 px-2 py-4">
          <div className="flex flex-wrap">
            {filteredDestinations.map((destination, index) => (
              <div key={index} className="w-1/3 p-4">
                <div className="h-64 border border-red-100 p-4 rounded-lg shadow-md bg-white flex flex-col">
                  <h1 className="text-2xl font-bold text-center mb-4">
                    {destination.country}
                  </h1>
                  <p className="text-gray-600 mb-2 flex-grow">
                    {destination.description}
                  </p>
                  <p className="text-gray-800 font-medium">
                    {destination.destination_name}
                  </p>
                  <button
                    className="border-2 border-teal-600 text-teal-600 px-3 py-2 mt-4 rounded-lg hover:bg-teal-600 hover:text-white transition duration-200 w-full"
                    onClick={() => handleDetails(destination.destination_id)}
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;