import React, { useState } from "react";

const TopRatedDestinations = ({ topDestinations, handleDetails }) => {
  // State to track the current page
  const [currentPage, setCurrentPage] = useState(0);

  // Number of items per page
  const itemsPerPage = 4;

  // Calculate the total number of pages
  const totalPages = Math.ceil(topDestinations.length / itemsPerPage);

  // Get destinations for the current page
  const currentDestinations = topDestinations.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Handlers for navigation buttons
  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      <section className="mb-4">
        <div className="mt-6 mb-6">
        <div className="text-3xl md:text-5xl font-extrabold text-blue-600 leading-tight text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 uppercase tracking-wide">
           Top Rating Destinations
          </h2>
        </div>
      </div>

        {/* Carousel Container */}
        <div className="carousel carousel-center gap-4 rounded-box relative bg-gray-100 p-4 sm:p-6 lg:p-8 shadow-lg">
          {/* Grid for Destinations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentDestinations.map((destination, index) => (
              <div
                className="relative bg-white rounded-lg border overflow-hidden shadow-lg h-80 sm:h-[20rem] md:h-[22rem] lg:h-[25rem] p-3"
                key={index}
              >
                <div className="relative h-full bg-cover bg-center bg-no-repeat carousel-item">
                  <img
                    src={`http://localhost:3000/backend/${destination.destination_image}`}
                    alt={destination.city}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white pb-2 rounded-lg shadow-lg">
                    <div className="flex flex-col sm:flex-row justify-between h-full">
                      <div className="mb-2">
                        <h3 className="text-lg sm:text-xl font-bold">
                          {destination.city}
                        </h3>
                        <p className="text-xs text-gray-300">
                          {destination.country}
                        </p>
                      </div>
                      <div className="mb-4">
                        <span className="flex mt-4 gap-1 px-3 py-1 bg-yellow-500 text-white text-sm font-semibold rounded-lg">
                          <p>from</p>${destination.price}
                        </span>
                      </div>
                    </div>
                    <button
                      className="w-full px-4 py-2 hover:text-black hover:bg-gray-100 rounded-lg border-white border bg-transparent text-white transition duration-200"
                      onClick={() => handleDetails(destination.destination_id)}
                    >
                      View Details
                    </button>
                  </div>
                  <span className="absolute top-4 left-4 bg-white/50 backdrop-blur-md backdrop-saturate-150 border border-gray-200 text-gray-900 text-sm font-semibold px-3 py-1 rounded-md shadow-sm">
                    {destination.category_name}
                  </span>
                  <span className="absolute top-4 right-4 bg-white/50 backdrop-blur-md backdrop-saturate-150 border border-gray-200 text-black text-sm font-semibold px-2 py-1 rounded-md flex items-center">
                    ⭐ {destination.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            className={`absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white rounded-full px-4 py-2 shadow-lg hover:bg-gray-700 ${
              currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handlePrev}
            disabled={currentPage === 0}
          >
            ❮
          </button>
          <button
            className={`absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white rounded-full px-4 py-2 shadow-lg hover:bg-gray-700 ${
              currentPage === totalPages - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
          >
            ❯
          </button>
        </div>
      </section>
    </>
  );
};

export default TopRatedDestinations;
