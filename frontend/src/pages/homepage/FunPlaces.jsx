import React from "react";

const FunPlaces = ({ destinations,handleDetails }) => {
  return (
    <>
      <div className="mb-3">
        <div className="text-5xl font-extrabold text-blue-600">
          <h2 className="text-2xl font-extrabold text-black">
            Great Destinations To try
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {destinations.map((destination, index) => (
          <div
            className="relative bg-white rounded-lg border overflow-hidden shadow-lg h-80"
            key={index}
          >
            <div className="relative h-full bg-cover bg-center bg-no-repeat">
              <img
                src={`http://localhost:3000/backend/${destination.destination_image}`}
                alt={destination.city}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white pb-2 rounded-lg shadow-lg">
                <div className="flex flex-row justify-between h-full">
                  <div className="mb-2">
                    <h3 className="text-lg font-bold">{destination.city}</h3>
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
    </>
  );
};

export default FunPlaces;
