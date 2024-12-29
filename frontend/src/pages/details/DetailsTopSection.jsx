import React from 'react'

const DetailsTopSection = ({destination, activeTab}) => {
  return (
    <>
    <div className="mt-5 p-6 border rounded-lg shadow-md bg-white">
        <div className="pb-6 border-b">
          <p className="text-2xl font-semibold text-gray-800">
            {destination.city}
          </p>
          <span className="text-gray-600 flex items-center mt-1">
            📍 {destination.country}
          </span>
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
            ].map((image, index) => (
              <div key={index}>
                {image ? (
                  <img
                    src={`http://localhost:3000/backend/${image}`}
                    alt={`Destination Side ${index + 1}`}
                    className="w-full h-40 rounded-lg shadow-lg object-cover"
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

      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center items-center justify-center">
          {["overview", "packages", "faq"].map((tab) => (
            <li className="me-2" key={tab}>
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === tab ? "border-blue-500 text-blue-500" : ""
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default DetailsTopSection