import React, { useContext, useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserContext";
import axios from "axios";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { useNotification } from "../providers/NotificationContext";


const Nav = () => {
  const {
    token,
    updateToken,
    userInfo,
    setUserInfo,
    deleteToken,
    savedNoti,
    updateSavedNoti,
    savedDestinationNoti,
    updateFavoriteDestinationNoti,
  } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchBar, setSearchBar] = useState(false);


  const { unreadCount } = useNotification();

  const navigate = useNavigate();

  const [savedArr, setSavedArr] = useState([]);
  const [favoriteArr, setFavoriteArr] = useState([]);

  // Logout handler
  const logoutHandler = () => {
    updateToken(null);
    const user_id = localStorage.getItem("user_id");
    localStorage.clear(); // Clear all localStorage items
    if (user_id) {
      localStorage.removeItem(`savedPackages_${user_id}`); // Remove user-specific saved packages
    }
    setUserInfo(null);
    navigate("/login");
  };

  // Get user information
  const getUserId = async () => {
    if (!token) {
      console.error("No token found, user may not be logged in.");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:3000/backend/login.php",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.status === 1 && response.data.customer) {
        const customer = response.data.customer;
        localStorage.setItem("user_id", customer.user_id);
        localStorage.setItem("username", customer.username);
        setUserInfo(customer);
      } else {
        console.error("Failed to fetch user ID:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user ID:", error.message);
    }
  };

  // Fetch the saved items count for the logged-in user
  const fetchSavedItemsCount = async () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    try {
      const response = await axios.get(
        `http://localhost:3000/backend/getCartInfo.php`,
        {
          params: { user_id: userId },
        }
      );

      if (response.data.status === 1) {
        setSavedArr(response.data.data.item_count); // Update the saved items count

        const savedKey = `savedPackages_${userId}`;
        localStorage.setItem(savedKey, savedArr);
        updateSavedNoti(response.data.data.item_count); // Update the saved items count

      } else {
        updateSavedNoti(0); // Reset saved items count
      }
    } catch (error) {
      console.error("Error fetching saved items count:", error.message);
    }
  };

  const notificationHandler = () => {
    navigate('/notification')
  }

  // Fetch the saved items count for the logged-in user
  const fetchFavoriteDestinationCount = async () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    try {
      const response = await axios.get(
        `http://localhost:3000/backend/getFavoriteInfo.php`,
        {
          params: { user_id: userId },
        }
      );

      if (response.data.status === 1) {
        setFavoriteArr(response.data.data.item_count); // Update the saved items count

        const savedKey = `favoriteDestination_${userId}`;
        localStorage.setItem(savedKey, favoriteArr);
        updateFavoriteDestinationNoti(response.data.data.item_count); // Update the saved items count

      } else {
        updateSavedNoti(0); // Reset saved items count
      }
    } catch (error) {
      console.error("Error fetching saved items count:", error.message);
    }
  };

  // Fetch user ID and saved items count when the token changes
  useEffect(() => {
    if (token) {
      getUserId(); // Fetch user ID
      fetchSavedItemsCount(); // Fetch saved items count
    }
  }, [token]); // Dependency on token


  let noti = 0;

  useEffect(() => {
    fetchSavedItemsCount();
  }, [userInfo, savedArr]);


  useEffect(() => {
    fetchFavoriteDestinationCount();
  }, [userInfo, favoriteArr]);

  useEffect(() => {
    // Polling every 10 seconds to check for updated status
    const interval = setInterval(() => {
      unreadCount
    }, 5000);

    // Clean up interval when the component unmounts
    return () => clearInterval(interval);
  }, []);


  const handleSearchChange = async (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.trim().length > 2) {
      try {
        const response = await axios.get("http://localhost:3000/backend/searchDestinations.php", {
          params: { query: term },
        });
        if (response.data.status === 1) {
          setSearchResults(response.data.data);
          setShowDropdown(true); // Ensure the dropdown is shown when there are results
        } else {
          setSearchResults([]);
          setShowDropdown(false); // Hide dropdown if no results
        }
      } catch (error) {
        console.error("Error fetching search results:", error.message);
      }
    } else {
      setSearchResults([]);
      setShowDropdown(false); // Hide dropdown if search term is too short
    }
  };

  const handleSearchSelect = (id) => {
    navigate(`/destination/${id}`); // Navigate to the selected destination
    setSearchTerm(""); // Clear search field
    setShowDropdown(false); // Hide dropdown after selection
  };

  const searchBarToggler = () => {
    setSearchBar(!searchBar)
  }

  return (
    <div className="navbar bg-white text-gray-900 rounded-2xl border border-gray-400 shadow-md fixed top-0 left-0 max-w-[97%] ml-[1.5%] pt-2 mt-3 z-50">
      <div className="navbar-start px-4  ">
        <Link
          to="/Explore"
          className="btn btn-ghost text-sm md:text-lg font-medium hover:bg-gray-100"
        >
          Explore
        </Link>
        <button className="btn btn-ghost btn-circle md:block hidden" onClick={searchBarToggler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        {
          searchBar && (
            <div className="navbar-center relative w-1/2">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search destinations..."
                className="input input-bordered w-full max-w-md"
              />
              {showDropdown && searchResults.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 rounded-lg shadow-lg w-full max-w-md mt-2 z-50">
                  {searchResults.map((result) => (
                    <li
                      key={result.destination_id} // Use the unique destination_id
                      onClick={() => handleSearchSelect(result.destination_id)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {result.city}, {result.country} {/* Display city and country */}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        }
      </div>
      <div className="navbar-center">
        <Link
          to="/"
          className="btn btn-ghost text-lg md:text-2xl font-semibold hover:text-gray-900"
        >
          Trailblazers
        </Link>
      </div>
      {token ? (
        <div className="navbar-end px-2 md:px-4 flex items-center md:space-x-3">

          <div className="dropdown dropdown-end">
            <Link to="/favorite-destinations">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle hover:bg-gray-100"
              >
                <div className="indicator text-2xl">
                  {/* Display saved notification badge */}
                  {savedDestinationNoti > 0 ? (
                    <>
                      <IoMdHeart />
                      <span className="badge badge-sm indicator-item bg-red-500 text-white">
                        {savedDestinationNoti}
                      </span>
                    </>
                  )
                    : (
                      <>
                        <IoIosHeartEmpty />
                      </>
                    )
                  }
                </div>
              </div>
            </Link>
          </div>
          <div className="dropdown dropdown-end">
            <Link to="/saved-packages">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle hover:bg-gray-100"
              >
                <div className="indicator text-lg">
                  {/* Display saved notification badge */}
                  {savedNoti > 0 ? (
                    <>
                      <FaBookmark />
                      <span className="badge badge-sm indicator-item bg-red-500 text-white">
                        {savedNoti}
                      </span>
                    </>
                  )
                    : (
                      <>
                        <FaRegBookmark />
                      </>
                    )
                  }
                </div>
              </div>
            </Link>
          </div>

          {userInfo && (
            <div className="dropdown dropdown-end">
              <div className="relative">
                {unreadCount > 0 && (
                  <div className="absolute top-0 right-0 badge text-center z-10 text-white w-6 h-6 p-2 bg-red-600 rounded-full text-xs font-semibold">
                    {unreadCount}
                  </div>
                )}
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar hover:bg-gray-100 p-2 rounded-full transition duration-200 ease-in-out"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300">
                    <img
                      alt="User Avatar"
                      src={`http://localhost:3000/backend/${userInfo.profile_image}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white rounded-lg shadow-lg z-10 mt-2 w-52 p-4 space-y-2"
              >
                {userInfo.role === "customer" && (
                  <li>
                    <Link
                      to="/profile"
                      className="flex justify-between items-center p-2 rounded-lg text-gray-800 hover:bg-gray-100 transition duration-200 ease-in-out"
                    >
                      Profile
                      <span className="badge text-pink-600">New</span>
                    </Link>
                  </li>
                )}

                {userInfo.role === "admin" && (
                  <li>
                    <Link
                      to="/admin"
                      className="text-blue-600 font-medium p-2 rounded-lg hover:bg-gray-100 transition duration-200 ease-in-out"
                    >
                      Admin Panel
                    </Link>
                  </li>
                )}

                <li>
                  <button
                    onClick={notificationHandler}
                    className="w-full text-left p-2 rounded-lg hover:bg-gray-100 transition duration-200 ease-in-out"
                  >
                    Notifications
                    {unreadCount > 0 && (
                      <div className="absolute right-0 badge text-center z-10 text-white w-6 h-6 p-2 bg-red-600 rounded-full text-xs font-semibold">
                        {unreadCount}
                      </div>
                    )}
                  </button>

                </li>

                <li>
                  <button
                    onClick={logoutHandler}
                    className="w-full text-left p-2 rounded-lg hover:bg-gray-100 transition duration-200 ease-in-out"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}

        </div>
      ) : (
        <>
          <div className="navbar-end px-1 md:px-4 hidden md:flex space-x-3 ">
            <Link
              to="/register"
              className=" text-xs border border-black px-2 py-2 rounded-md md:btn md:btn-outline  hover:border-blue-600 hover:text-white"
            >
              Register
            </Link>
            <Link
              to="/login"
              className=" text-xs border border-black px-2 py-2  md:btn md:btn-outline bg-gray-900 md:bg-gray-900 text-white md:text-white rounded-lg"
            >
              Login
            </Link>
          </div>
          <div className="navbar-end px-1 md:px-4 md:hidden flex space-x-3 ">
          <Link
              to="/login"
              className=" text-xs border border-black px-2 py-2 rounded-md md:btn md:btn-outline hover:bg-gray-900  hover:border-gray-900 hover:text-white"
            >
              Get Started
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Nav;
