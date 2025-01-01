import React from "react";
import { IoLocationSharp } from "react-icons/io5";

const DetailsTopSection = ({ destination }) => {
  return (
    <>
      <div className="mt-5 p-6 border rounded-lg shadow-md bg-white dark:bg-gray-800">
        <div className="flex justify-between md:flex-row md:items-center md:justify-between">
          <div className="pb-6 border-b md:border-b-0 md:pb-0 md:border-r md:pr-6">
            <p className="text-2xl font-bold text-gray-800">
              {destination.city}
            </p>
            <div className="flex items-center gap-4 mt-2 text-sm justify-center">
              <p className="text-gray-500 flex items-center gap-1">
                <span className="text-yellow-300 text-lg">★</span>
                {destination.rating}
              </p>
              <span className="text-gray-600 flex items-center mt-1">
                <IoLocationSharp /> {destination.country}
              </span>
            </div>
          </div>
          <div className="mr-4 mt-4 md:mt-0"></div>
        </div>
        <div className="flex flex-col md:flex-row mt-6 gap-6">
          {/* Main Image */}
          <div className="w-full md:w-3/5">
            {destination.destination_image ? (
              <img
                src={`http://localhost:3000/backend/${destination.destination_image}`}
                alt="Destination"
                className="w-full h-full rounded-lg shadow-lg object-cover"
              />
            ) : (
              <p className="text-gray-500 text-center py-10 border rounded-lg">
                No Image Available For Now
              </p>
            )}
          </div>

          {/* Side Images */}
          <div className="flex flex-col md:w-2/5 gap-4">
            {[
              destination.destination_second_image,
              destination.destination_third_image,
              destination.accommodation_image
            ].map((image, index) => (
              <div key={index}>
                {image ? (
                  <img
                    src={`http://localhost:3000/backend/${image}`}
                    alt={`Destination Side ${index + 1}`}
                    className="w-full h-44 rounded-lg shadow-lg object-cover"
                  />
                ) : (
                  <p className="text-gray-500 text-center py-10 border rounded-lg">
                    No Image Available For Now
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsTopSection;
