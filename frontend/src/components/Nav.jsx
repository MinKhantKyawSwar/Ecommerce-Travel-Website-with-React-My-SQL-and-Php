import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserContext";
import axios from "axios";
import { FaRegBookmark } from "react-icons/fa";

const Nav = () => {
  const {
    token,
    updateToken,
    userInfo,
    setUserInfo,
    deleteToken,
    savedNoti,
    updateSavedNoti,
  } = useContext(UserContext);
  const navigate = useNavigate();

  const [savedArr, setSavedArr] = useState([]);

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

  // Fetch user ID and saved items count when the token changes
  useEffect(() => {
    if (token) {
      getUserId(); // Fetch user ID
      fetchSavedItemsCount(); // Fetch saved items count
    }
  }, [token]); // Dependency on token

  useEffect(() => { 
    fetchSavedItemsCount();
  }, [userInfo, savedArr]);

  return (
    <div className="navbar bg-white text-gray-900 rounded-2xl border border-gray-400 shadow-md fixed top-0 left-0 max-w-[95%] ml-[3%] pt-2 mt-2 z-50">
      <div className="navbar-start px-4">
        <Link
          to="/Explore"
          className="btn btn-ghost text-lg font-medium hover:bg-gray-100"
        >
          Explore
        </Link>
      </div>
      <div className="navbar-center">
        <Link
          to="/"
          className="btn btn-ghost text-2xl font-semibold hover:text-gray-900"
        >
          Trailblazers
        </Link>
      </div>
      {token ? (
        <div className="navbar-end px-4 flex items-center space-x-3">
          <div className="dropdown dropdown-end">
            <Link to="/saved-packages">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle hover:bg-gray-100"
              >
                <div className="indicator text-lg">
                  <FaRegBookmark />
                  {/* Display saved notification badge */}
                  {savedNoti > 0 && (
                    <span className="badge badge-sm indicator-item bg-red-500 text-white">
                      {savedNoti}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </div>

          {userInfo && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:bg-gray-100"
              >
                <div className="w-8 rounded-full">
                  <img
                    alt="User Avatar"
                    src={`http://localhost:3000/backend/${userInfo.profile_image}`}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white rounded-lg shadow-md z-10 mt-2 w-52 p-2"
              >
                <li>
                  <Link
                    to="/profile"
                    className="flex justify-between items-center hover:bg-gray-100"
                  >
                    Profile
                    <span className="badge text-pink-600">New</span>
                  </Link>
                </li>
                {userInfo.role === "admin" && (
                  <li>
                    <Link
                      to="/admin"
                      className="text-blue-600 font-medium hover:bg-gray-100"
                    >
                      Admin Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={logoutHandler}
                    className="w-full text-left hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="navbar-end px-4 flex space-x-3">
          <Link
            to="/register"
            className="btn btn-outline border-gray-300 hover:border-blue-600 hover:text-white"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="btn bg-gray-900 hover:bg-gray-900 text-white rounded-xl"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Nav;
