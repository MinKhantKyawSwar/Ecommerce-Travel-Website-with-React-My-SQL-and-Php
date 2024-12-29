import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserContext";
import axios from "axios";

const Nav = () => {
  const { token, updateToken, userInfo, setUserInfo, deleteToken } =
    useContext(UserContext);
  const navigate = useNavigate();

  const [cartItem, setCartItem] = useState(0);

  const logoutHandler = () => {
    updateToken(null);
    localStorage.removeItem("token", "user_id", "username");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    setUserInfo("");
    navigate("/login");
  };

  const getUserId = async () => {
    try {
      if (!token) {
        console.error("No token found, user may not be logged in.");
        return;
      }

      const response = await axios.get(
        "http://localhost:3000/backend/login.php",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.status === 1 && response.data.customer) {
        // Set username in state and localStorage
        const customer = response.data.customer;
        localStorage.setItem("user_id", customer.user_id);
        localStorage.setItem("username", customer.username);
        setUserInfo(customer); // Optionally, update userInfo if needed
      } else {
        console.error("Failed to fetch user ID:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user ID:", error.message);
    }
  };

  const getSavedItems = async () => {
  const data = {
      user_id: localStorage.getItem("user_id"),
  }
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getCartInfo.php", data,
      );

      if (response.data.status === 1) {
        setCartItem(response.data.data);
      } else {
        setError("No data found");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      // Fetch user ID only if the token exists
      getUserId();
    }
  }, [token]); // Run effect when token changes

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div>
          <Link to={"/Explore"} className="btn btn-ghost text-lg font-normal">
            Explore
          </Link>
        </div>
      </div>
      <div className="navbar-center">
        <Link to={"/"} className="btn btn-ghost text-xl">
          Trailblazers
        </Link>
      </div>
      {token ? (
        <>
          <div className="navbar-end">
            <div className="dropdown dropdown-end">
              <Link to={"/saved-packages"}>
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="badge badge-sm indicator-item">
                      {cartItem}
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {token && userInfo && (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={`http://localhost:3000/backend/${userInfo.profile_image}`}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    {userInfo && (
                      <Link to="/profile" className="justify-between">
                        Profile
                        <span className="badge text-pink-600">New</span>
                      </Link>
                    )}
                  </li>
                  <li>
                    {userInfo.role === "admin" && (
                      <Link
                        to={"/admin"}
                        className="w-30 text-blue-600 font-medium py-2"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                  </li>
                  <li>
                    <div onClick={logoutHandler}>Logout</div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="navbar-end flex gap-3">
            <Link
              to="/register"
              className="btn btn-outline mr-2" // Added button style and margin
            >
              Register
            </Link>
            <Link
              to="/login"
              className="btn btn-primary text-white mr-2 rounded-xl" // Added button style for emphasis
            >
              Login
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Nav;
