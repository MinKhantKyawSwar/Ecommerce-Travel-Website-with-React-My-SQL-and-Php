import axios from "axios";
import React, { useEffect, useState } from "react";
import { debounce } from "lodash"; // Import lodash for debouncing
import { MdOutlineSearch } from "react-icons/md";

const Explore = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState([]);

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

  // Unique countries and cities for filtering
  const uniqueCountries = Array.from(
    new Set(destinations.map((destination) => destination.country))
  );
  const uniqueCities = Array.from(
    new Set(destinations.map((destination) => destination.destination_name))
  );

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
        destination.description.toLowerCase().includes(searchQuery);

      const matchesCountry =
        selectedCountries.length === 0 ||
        selectedCountries.includes(destination.country);
      const matchesCity =
        selectedCities.length === 0 ||
        selectedCities.includes(destination.city);

      return matchesSearchQuery && matchesCountry && matchesCity;
    });

    setFilteredDestinations(filtered);
  }, [destinations, searchQuery, selectedCountries, selectedCities]);

  // Fetch destinations on initial load
  useEffect(() => {
    getDestinations();
  }, []);

  return (
    <div className="p-4">
      <div className="text-center mb-8">
        <p className="text-4xl font-bold text-gray-900">
          Find Your Dream Destination Here!
        </p>
        <div className="mt-4">
          <MdOutlineSearch />
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search destinations..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Main Section with Sidebar at the top on smaller screens */}
      <div className="w-full flex flex-col md:flex-row gap-10">
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
            <p className="text-2xl font-semibold text-gray-900 mb-4">Cities</p>
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
        </div>

        {/* Main Content */}
        <div className="w-full md:w-2/3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination, index) => (
              <div
                key={index}
                className="p-4 border border-gray-300 rounded-lg bg-gray-50"
              >
                <h1 className="text-lg font-semibold text-center text-gray-900 mb-3">
                  {destination.country}
                </h1>
                <p className="text-sm text-gray-700 mb-4 flex-grow">
                  {destination.description}
                </p>
                <p className="text-sm text-gray-900 font-medium mb-2">
                  {destination.destination_name}
                </p>
                <button className="border border-gray-900 text-gray-900 px-3 py-2 rounded-md text-sm font-medium w-full">
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
