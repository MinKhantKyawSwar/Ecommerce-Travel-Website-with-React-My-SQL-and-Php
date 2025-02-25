import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaBars,
  FaUser,
  FaUserFriends,
  FaTimes
} from "react-icons/fa"; // Importing icons
import axios from "axios";
import Dashboard from "./Dashboard";
import Transactions from "./Transactions";
import ManageDestination from "./ManageDestination";
import ManageCustomer from "./ManageCustomer";
import Profile from "./Profile";
import ManageGuide from "./ManageGuide";
import { FaMapLocationDot,FaPerson, } from "react-icons/fa6";

const Index = () => {
  const [activeTabKey, setActiveTabKey] = useState(
    localStorage.getItem("activeTabKey") || "dashboard"
  );
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [adminInfo, setAdminInfo] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getUserInfo = async (user_id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/backend/adminInfo.php`,
        {
          headers: {
            User_Id: user_id,
          },
        }
      );

      if (response.data.status === 1) {
        setAdminInfo(response.data.data[0]);
      } else {
        setError("There was an error fetching data.");
      }
    } catch (err) {
      setError("Failed to fetch packages: " + err.message);
    }
  };

  const isAdmin = () => {
    if (adminInfo.role !== "admin") {
      navigate("/");
    }
  };

  // Save active tab to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("activeTabKey", activeTabKey);
  }, [activeTabKey]);

  const handleTabClick = (tab) => {
    setActiveTabKey(tab);
  };
  const goBackHandler = () => {
    localStorage.removeItem("activeTabKey");
    navigate("/");
  };

  useEffect(() => {
    if (adminInfo.role) {
      isAdmin();
    }
  }, [adminInfo, navigate]);

  useEffect(() => {
    const userId = Number(localStorage.getItem("user_id"));
    if (userId) {
      getUserInfo(userId);
    } else {
      setError("User ID not found in local storage.");
    }
  }, []);

  return (
    <section className="container mx-auto mt-10">
      <button
        className="text-black font-medium py-2 px-10 mt-4 rounded-lg border border-gray-600 hover:bg-gray-900 hover:text-white transition duration-200"
        onClick={goBackHandler}
      >
        Go Back
      </button>

      <div className="flex flex-col md:flex-row">
         {/* Sidebar Toggle Button for Mobile */}
      <button
        className="md:hidden w-full top-96 left-4 bg-gray-50 text-gray-900 p-3 "
        onClick={() => setSidebarVisible(!isSidebarVisible)}
      >
        {isSidebarVisible ? <FaTimes /> : <FaBars />}
      </button>
        {/* Sidebar */}
        <div
          className={`w-full md:w-1/5 bg-gray-50 dark:bg-gray-800 p-4 shadow-xl transition-all duration-300 ${
            isSidebarVisible ? "block" : "hidden md:block"
          }`}
        >
          <ul className="flex flex-col space-y-2">
            {[
              { name: "dashboard", icon: <FaHome /> },
              { name: "transactions", icon: <FaBox /> },
              { name: "Manage Destination", icon: <FaMapLocationDot /> },
              { name: "Manage Customers", icon: <FaUserFriends /> },
              { name: "Manage Guide", icon:<FaPerson />},
              { name: "Profile", icon: <FaUser /> },
             

            ].map(({ name, icon }) => (
              <li key={name}>
                <button
                  className={`flex items-center w-full text-left p-2 rounded-lg transition-colors duration-200 ${
                    activeTabKey === name
                      ? "bg-gray-900 text-white"
                      : "text-gray-800 hover:text-white hover:bg-gray-900 dark:hover:bg-gray-900"
                  }`}
                  onClick={() => handleTabClick(name)}
                >
                  <span className="mr-2">{icon}</span>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Content Area */}
        <div className="w-full md:w-4/5 p-4">
          {activeTabKey === "dashboard" && <Dashboard />}
          {activeTabKey === "transactions" && <Transactions />}
          {activeTabKey === "Manage Destination" && <ManageDestination />}
          {activeTabKey === "Manage Customers" && <ManageCustomer />}
          {activeTabKey === "Manage Guide" && <ManageGuide />}
          {activeTabKey === "Profile" && <Profile />}
        </div>
      </div>

     
    </section>
  );
};

export default Index;
