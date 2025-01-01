import axios from "axios";
import React, { useEffect, useState } from "react";
import { debounce } from "lodash"; // Import lodash for debouncing
import { MdOutlineSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState([]);

  const navigate = useNavigate();

  // Fetch all destinations
  const getDestinations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getDestination.php"
      );
      if (response.data.status === 1) {
        setDestinations(response.data.data);
        console.log(response.data.data);
      } else {
        setError("No data found");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch details of a single destination
  const handleDetails = async (id) => {
    try {
      setLoading(true); // Show loading for details
      const response = await axios.get(
        `http://localhost:3000/backend/getDestination.php?id=${id}`
      );

      if (response.data.status === 1) {
        setSelectedDestination(response.data.data); // Save details of the selected destination
        navigate(`/destination/${id}`);
      } else {
        setError("No details found for this destination");
      }
    } catch (err) {
      setError("Failed to fetch details: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Unique countries and cities for filtering
  const uniqueCountries = Array.from(
    new Set(destinations.map((destination) => destination.country))
  ).sort();
  const uniqueCities = Array.from(
    new Set(destinations.map((destination) => destination.city))
  ).sort();
  const uniqueCategories = Array.from(
    new Set(destinations.map((destination) => destination.category_name))
  ).sort();

  // Handle country checkbox change
  const handleCountryCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedCountries((prev) =>
      checked ? [...prev, name] : prev.filter((country) => country !== name)
    );
  };

  // Handle city checkbox change
  const handleCityCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedCities((prev) =>
      checked ? [...prev, name] : prev.filter((city) => city !== name)
    );
  };

  const handleCategoryCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, name] : prev.filter((category) => category !== name)
    );
  };

  // Handle search query change with debounce to prevent unnecessary filtering
  const handleSearchChange = debounce((e) => {
    setSearchQuery(e.target.value.toLowerCase());
  }, 300); // Debounce time is 300ms

  // Filter destinations based on search query and selected filters
  useEffect(() => {
    const filtered = destinations.filter((destination) => {
      const matchesSearchQuery =
        destination.country.toLowerCase().includes(searchQuery) ||
        destination.city.toLowerCase().includes(searchQuery) ||
        destination.category_name.toLowerCase().includes(searchQuery);

      const matchesCountry =
        selectedCountries.length === 0 ||
        selectedCountries.includes(destination.country);
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(destination.category_name);
      const matchesCity =
        selectedCities.length === 0 ||
        selectedCities.includes(destination.city);

      return matchesSearchQuery && matchesCountry && matchesCity && matchesCategory;
    });

    setFilteredDestinations(filtered);
  }, [
    destinations,
    searchQuery,
    selectedCountries,
    selectedCities,
    selectedCategories,
  ]);

  // Fetch destinations on initial load
  useEffect(() => {
    getDestinations();
  }, []);

  return (
    <div className="p-4">
      <div className="text-center mb-8">
        <p className="text-4xl font-bold text-gray-900">
          Find Your Dream Trip Here!
        </p>
        <div className="mt-4 flex items-center justify-center">
          <label className="input input-bordered flex items-center gap-2">
            <MdOutlineSearch className="mr-2" />
            <input
              type="text"
              className="grow w-full max-w-md pr-32 py-2  focus:outline-none  focus:rounded-md focus:ring-2 focus:ring-gray-300"
              placeholder="Search countries or cities..."
              onChange={handleSearchChange}
            />
          </label>
        </div>
      </div>

      {/* Main Section with Sidebar at the top on smaller screens */}
      <div className="w-full flex flex-col md:flex-row gap-2">
        {/* Sidebar - Moves to top on smaller screens */}
        <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
          <div className="mb-8">
            <p className="text-2xl font-semibold text-gray-900 mb-4">
              Countries
            </p>
            <form>
              <div className="flex flex-wrap">
                {uniqueCountries.map((country, index) => (
                  <div key={index} className="flex items-center mb-3 w-1/2">
                    <input
                      type="checkbox"
                      id={`country-${index}`}
                      name={country}
                      onChange={handleCountryCheckboxChange}
                      className="mr-2 accent-gray-900"
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

          <div>
            <p className="text-2xl font-semibold  text-gray-900 mb-4">Cities</p>
            <form>
              <div className="flex flex-wrap">
                {uniqueCities.map((city, index) => (
                  <div key={index} className="flex items-center mb-3 w-1/2">
                    <input
                      type="checkbox"
                      id={`city-${index}`}
                      name={city}
                      onChange={handleCityCheckboxChange}
                      className="mr-2 accent-gray-900"
                    />
                    <label htmlFor={`city-${index}`} className="text-gray-800">
                      {city}
                    </label>
                  </div>
                ))}
              </div>
            </form>
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-900 mb-4">Cities</p>
            <form>
              <div className="flex flex-wrap">
                {uniqueCategories.map((city, index) => (
                  <div key={index} className="flex items-center mb-3 w-1/2">
                    <input
                      type="checkbox"
                      id={`city-${index}`}
                      name={city}
                      onChange={handleCategoryCheckboxChange}
                      className="mr-2 accent-gray-900"
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

        {/* Main Content */}
        <div className="flex w-full md:w-2/3 justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 top-4 left-4 bg-white/50 backdrop-blur-md backdrop-saturate-150 border border-gray-200 text-gray-900 text-sm font-semibold rounded-md shadow-lg"
              >
                <img
                  src={`http://localhost:3000/backend/${destination.destination_image}`}
                  alt={destination.country}
                  className="w-full h-24 object-cover"
                />
                <h1 className="text-lg font-semibold text-center text-gray-900 mb-3">
                  {destination.country}
                </h1>

                <p className="text-sm text-gray-900 font-medium mb-2">
                  {destination.city}
                </p>
                <p className="text-sm text-gray-700 mb-4 flex-grow">
                  {destination.description.length > 0
                    ? `${destination.description.slice(0, 24)}...`
                    : destination.description}
                </p>
                <button
                  className="border border-gray-900 text-gray-900 px-3 py-2 rounded-md text-sm font-medium w-full hover:bg-gray-900 hover:text-white transition duration-200 "
                  onClick={() => handleDetails(destination.destination_id)}
                >
                  Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
