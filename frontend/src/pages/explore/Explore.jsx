import axios from "axios";
import React, { useEffect, useState } from "react";
import { debounce } from "lodash"; // Import lodash for debouncing
import { MdOutlineSearch } from "react-icons/md";
import { redirect, useNavigate } from "react-router-dom";

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
  const [priceRange, setPriceRange] = useState([0, 1200]); // Default price range
  const [maxPrice, setMaxPrice] = useState(1200); // Maximum price available
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [destinationPerPage] = useState(9); // Number of destinations per page
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  // Fetch all destinations
  const getDestinations = async () => {
    try {
      const response = await axios.get("http://localhost:3000/backend/getDestination.php");
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

  // Fetch details of a single destination
  const handleDetails = async (id) => {
    try {
      setLoading(true); // Show loading for details
      const response = await axios.get(`http://localhost:3000/backend/getDestination.php?id=${id}`);
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

  // Unique countries for filtering
  const uniqueCountries = Array.from(new Set(destinations.map((destination) => destination.country))).sort();
  // Handle country checkbox change
  const handleCountryCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedCountries((prev) =>
      checked ? [...prev, name] : prev.filter((country) => country !== name)
    );
  };

  // Unique cites for filtering
  const uniqueCities = Array.from(new Set(destinations.map((destination) => destination.city))).sort();
  // Handle city checkbox change
  const handleCityCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedCities((prev) =>
      checked ? [...prev, name] : prev.filter((city) => city !== name)
    );
  };

  // Unique categories for filtering
  const uniqueCategories = Array.from(new Set(destinations.map((destination) => destination.category_name))).sort();
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
        selectedCountries.length === 0 || selectedCountries.includes(destination.country);
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(destination.category_name);
      const matchesCity =
        selectedCities.length === 0 || selectedCities.includes(destination.city);
      const matchesPrice =
        destination.least_price >= priceRange[0] && destination.least_price <= priceRange[1];

      return matchesSearchQuery && matchesCountry && matchesCity && matchesCategory && matchesPrice;
    });

    setFilteredDestinations(filtered);
  }, [destinations, searchQuery, selectedCountries, selectedCities, selectedCategories, priceRange]);

  // Fetch destinations on initial load
  useEffect(() => {
    getDestinations();
  }, []);

  // Calculate the index of the first and last destination for the current page
  const indexOfLastDestination = currentPage * destinationPerPage;
  const indexOfFirstDestination = indexOfLastDestination - destinationPerPage;

  // Slice the filtered destinations for the current page
  const currentDestinations = filteredDestinations.slice(indexOfFirstDestination, indexOfLastDestination);

  // Pagination controls with scroll-to-top
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredDestinations.length / destinationPerPage);

  const handleReset = () => {
    window.location.reload();
  };



  return (
    <div className="p-4">
      <div className="text-center mb-8 flex w-full flex-col items-center justify-center">
        <p className="text-2xl font-semibold">Find your next destination</p>
        <div className="mt-2 w-1/2">
          <label className="input input-bordered flex items-center gap-2">
            <MdOutlineSearch className="mr-2" />
            <input
              type="text"
              className="grow max-w-md"
              placeholder="Search here..."
              onChange={handleSearchChange}
            />
          </label>
        </div>
      </div>

      {/* Main Section with Sidebar at the top on smaller screens */}
      <div className="w-full flex flex-col md:flex-row gap-2">
        {/* Sidebar - Moves to top on smaller screens */}
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="w-full text-lg font-semibold text-gray-900 mb-4 block sm:hidden"
        >
          {isVisible ? 'Hide Filters' : 'Show Filters'}
        </button>
        <div className={`${isVisible ? 'block' : 'hidden'} sm:block w-full md:w-1/4 px-4 mb-8`}>

          {/* Reset Button */}
          <div className="mt-6 ">
            <button
              onClick={handleReset}
              className="w-full py-2 mb-5 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-200"
            >
              Reset Filters
            </button>
          </div>

          <div>
            <p className="text-2xl font-semibold text-gray-900 mb-2">Price Range</p>
            <hr />
            <div className="py-2">
              <p className="mb-1 text-sm">{`$${priceRange[0]} - $${priceRange[1]}`}</p>
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([parseFloat(e.target.value), priceRange[1]])
                }
                className="w-full accent-gray-900"
              />
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], parseFloat(e.target.value)])
                }
                className="w-full accent-gray-900 mt-2"
              />
            </div>
          </div>

          <div>
            <p className="text-2xl font-semibold text-gray-900 mb-2">Countries</p>
            <hr />
            <form>
              <div className="flex flex-wrap py-2">
                {uniqueCountries.map((country, index) => (
                  <div key={index} className="flex items-center mb-3 w-1/2">
                    <input
                      type="checkbox"
                      id={`country-${index}`}
                      name={country}
                      onChange={handleCountryCheckboxChange}
                      className="mr-2 accent-gray-900"
                    />
                    <label htmlFor={`country-${index}`} className="text-gray-800">
                      {country}
                    </label>
                  </div>
                ))}
              </div>
            </form>
          </div>

          <div>
            <p className="text-2xl font-semibold text-gray-900 mb-2">Cities</p>
            <hr />
            <form>
              <div className="flex flex-wrap py-2">
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

          <div className="mb-20">
            <p className="text-2xl font-semibold text-gray-900 mb-4">Categories</p>
            <hr />
            <form>
              <div className="flex flex-wrap py-2">
                {uniqueCategories.map((category, index) => (
                  <div key={index} className="flex items-center mb-3 w-1/2">
                    <input
                      type="checkbox"
                      id={`category-${index}`}
                      name={category}
                      onChange={handleCategoryCheckboxChange}
                      className="mr-2 accent-gray-900"
                    />
                    <label htmlFor={`category-${index}`} className="text-gray-800">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </form>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col w-full">
          <div className="flex w-full h-full justify-start">
            <div className="h-full grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentDestinations.map((destination, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-50 rounded-lg shadow-lg transform transition duration-300 hover:bg-white hover:shadow-2xl"
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={`http://localhost:3000/backend/${destination.destination_image}`}
                      alt={destination.country}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110 rounded-t-lg"
                    />
                  </div>
                  <div className="text-center mt-4 space-y-2">
                    <h1 className="text-2xl font-semibold text-gray-800">{destination.city}</h1>
                    <p className="text-md text-gray-600">{destination.country}</p>
                    <p className="text-sm text-gray-500">
                      {destination.description.length > 50
                        ? `${destination.description.slice(0, 40)}...`
                        : destination.description}
                    </p>
                  </div>
                  <button
                    className="w-full py-2 text-sm font-semibold text-white bg-slate-800 rounded-md hover:bg-black transition-colors duration-200 mt-4"
                    onClick={() => handleDetails(destination.destination_id)}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8">
            <nav className="inline-flex items-center space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                className={`px-4 py-2 text-lg font-semibold text-gray-900 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 transition-all ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}`}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 text-lg font-semibold text-gray-600 bg-white border border-gray-300 hover:bg-gray-100 transition-all ${currentPage === index + 1
                    ? "bg-gray-200 text-gray-900 border-2 border-black font-semibold"
                    : ""
                    }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                className={`px-4 py-2 text-lg font-semibold text-gray-900 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 transition-all ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}`}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </nav>
          </div>
        </div>


      </div>
    </div>

  );
};

export default Explore;
