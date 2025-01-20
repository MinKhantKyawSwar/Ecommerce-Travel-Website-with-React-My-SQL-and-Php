import { useState } from "react";
import axios from "axios";

const NewNav = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  let timeoutId; // Declare timeoutId to store the timeout reference

  const handleSearchChange = async (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    // Clear the previous timeout (for debouncing)
    clearTimeout(timeoutId);

    if (term.trim().length > 2) {
      timeoutId = setTimeout(async () => {
        try {
          const response = await axios.get("http://localhost:3000/backend/searchDestinations.php", {
            params: { query: term },
          });
          console.log("API Response:", response.data);

          if (response.data.status === 1) {
            setSearchResults(response.data.data);
            setShowDropdown(true); // Show dropdown if results are found
          } else {
            setSearchResults([]);
            setShowDropdown(false); // Hide dropdown if no results
          }
        } catch (error) {
          console.error("Error fetching search results:", error.message);
          setSearchResults([]);
          setShowDropdown(false); // Hide dropdown on error
        }
      }, 500); // Delay of 500ms for debouncing
    } else {
      setSearchResults([]);
      setShowDropdown(false); // Hide dropdown if the search term is too short
    }
  };

  const handleSearchSelect = (id) => {
    // Handle selection from the dropdown
    console.log(`Selected destination ID: ${id}`);
    setSearchTerm(""); // Clear search field
    setShowDropdown(false); // Hide dropdown after selection
  };

  return (
    <div className="navbar-center relative">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search destinations..."
        className="input input-bordered w-full max-w-md"
      />
      {showDropdown && searchResults.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 w-full mt-2 max-h-40 overflow-y-auto shadow-lg">
          {searchResults.map((result) => (
            <li
              key={result.destination_id}
              onClick={() => handleSearchSelect(result.destination_id)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {result.city}, {result.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewNav;
