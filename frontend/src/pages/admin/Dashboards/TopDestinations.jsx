const TopDestinations = ({ destinationsData }) => {
  return (
    <div className="mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 underline">
        Top Destinations
      </h2>

      {/* Table Header */}
      <div className="flex justify-between items-center font-semibold text-gray-700 mb-4 border-b pb-2">
        <div className="pr-2 text-left">No.</div>
        <div className="w-1/2 text-left">Destination</div>
        <div className="w-1/2 text-right">Travellers</div>
      </div>

      {/* Destination List */}
      <ul className="space-y-4">
        {destinationsData && destinationsData.length > 0 ? (
          destinationsData.map((destination, index) => (
            <li key={index} className="flex items-start">
              <div className="mr-4 text-xl font-bold text-blue-600">
                {index + 1}.
              </div>
              <div className="w-full flex justify-between">
                <h3 className="font-semibold text-gray-800">
                  {destination.city}, {destination.country}
                </h3>
                <p className="text-sm text-gray-600 text-right">
                  {destination.total_travellers}
                </p>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No destinations available.
          </p>
        )}
      </ul>
    </div>
  );
};
export default TopDestinations;
