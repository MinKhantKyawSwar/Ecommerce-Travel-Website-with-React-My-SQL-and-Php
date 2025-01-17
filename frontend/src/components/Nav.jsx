import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserContext";
import axios from "axios";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";


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
    <div className="navbar bg-white text-gray-900 rounded-2xl border border-gray-400 shadow-md fixed top-0 left-0 max-w-[97%] ml-[1.5%] pt-2 mt-3 z-50">
      <div className="navbar-start px-4  ">
        <Link
          to="/Explore"
          className="btn btn-ghost text-sm md:text-lg font-medium hover:bg-gray-100"
        >
          Explore
        </Link>
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
        <div className="navbar-end px-2 md:px-4 flex items-center space-x-3">

          <div className="dropdown dropdown-end">
            <Link to="/favorite-destinations">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle hover:bg-gray-100"
              >
                <div className="indicator text-2xl">
                  {/* Display saved notification badge */}
                  {savedNoti > 0 ? (
                    <>
                      <IoMdHeart />
                      {/* <span className="badge badge-sm indicator-item bg-red-500 text-white">
                        {savedNoti}
                      </span> */}
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
                {userInfo.role === "customer" &&
                  (<li>
                    <Link
                      to="/profile"
                      className="flex justify-between items-center hover:bg-gray-100"
                    >
                      Profile
                      <span className="badge text-pink-600">New</span>
                    </Link>
                  </li>)
                }
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
        <div className="navbar-end px-1 md:px-4 flex space-x-3">
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
      )}
    </div>
  );
};

export default Nav;
