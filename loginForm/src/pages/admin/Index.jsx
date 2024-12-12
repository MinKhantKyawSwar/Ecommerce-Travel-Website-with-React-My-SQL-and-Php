import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../utils/UserContext";
import { useNavigate } from "react-router-dom";
import { FaHome, FaBox, FaQuestionCircle, FaUser } from "react-icons/fa"; // Importing icons

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const isAdmin = () => {
    if (userInfo && userInfo.role !== "admin") {
      navigate("/");
    }
  };

  useEffect(() => {
    isAdmin();
  }, [userInfo]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-50 dark:bg-gray-800 p-4 shadow-xl">
        <ul className="flex flex-col space-y-2">
          {[
            { name: "dashboard", icon: <FaHome /> },
            { name: "transactions", icon: <FaBox /> },
            { name: "Manage Products", icon: <FaQuestionCircle /> },
            { name: "manageCustomers", icon: <FaQuestionCircle /> },
            { name: "profile", icon: <FaUser /> },
          ].map(({ name, icon }) => (
            <li key={name}>
              <button
                className={`flex items-center w-full text-left p-2 rounded-lg transition-colors duration-200 ${
                  activeTab === name
                    ? "bg-blue-500 text-white"
                    : "text-gray-800 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700"
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
      <div className="w-4/5 p-4">
        {activeTab === "dashboard" && (
          <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md">
            <h2 className="text-lg font-semibold mb-2">Dashboard</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Location, Best time to Visit, Weather, Local Currency, Language,
              review, tips
            </p>
          </div>
        )}
        {activeTab === "transactions" && (
          <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md">
            <h2 className="text-lg font-semibold mb-2">Transactions</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Hi</p>
          </div>
        )}
        {activeTab === "Manage Products" && (
          <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md">
            <h2 className="text-lg font-semibold mb-2">Manage Products</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This is some placeholder content for the{" "}
              <strong className="font-medium text-gray-800 dark:text-white">
                Manage Products tab
              </strong>
              .
            </p>
          </div>
        )}
        {activeTab === "manageCustomers" && (
          <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md">
            <h2 className="text-lg font-semibold mb-2">Manage Customers</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This is some placeholder content for the{" "}
              <strong className="font-medium text-gray-800 dark:text-white">
                Manage Customers tab
              </strong>
              .
            </p>
          </div>
        )}
        {activeTab === "profile" && (
          <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md">
            <h2 className="text-lg font-semibold mb-2">Profile</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This is some placeholder content for the{" "}
              <strong className="font-medium text-gray-800 dark:text-white">
                Profile tab
              </strong>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
