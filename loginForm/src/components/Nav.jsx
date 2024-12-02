import React, { useContext, useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";

import { UserContext } from "../utils/UserContext";
import axios from "axios";


const nav = () => {
  const { token, updateToken, userInfo, setUserInfo, deleteToken } = useContext(UserContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    updateToken(null);
    localStorage.removeItem("token");
    setUserInfo("")
    navigate("/login")
  };

  const getUserId = async () => {
    try {
    //   const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found, user may not be logged in.");
        return;
      }

      const response = await axios.get("http://localhost:3000/backend/login.php", {
        headers: { Authorization: `Bearer ${token}` },
      });


      if (response.data.status === 1 && response.data) {
        setUserInfo(response.data.customer);
        setEmail(response.data.customer.email);
        return response.data.customer
      } else {
        console.error("Failed to fetch user ID:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user ID:", error.message);
    }
  };

  // useEffect((_)=>{
  //   getUserId();
  // })


  return (
    <nav className="bg-slate-50 py-2 w- m-auto">
      <div className="flex items-center justify-around">
        <div className="flex px-5">
        <Link to={"/Explore"} className="text-blue-600 text-xl pt-2">
          Explore
        </Link>
        </div>
        <div className="flex ">
        <Link to={"/"} className="text-blue-600 font-bold text-3xl pt-2 px-40">
          Trailblazers
        </Link>
        </div>
        
        <div className="flex gap-3">
          {token ? (
            <>
              <Link to={"/profile"} className="w-10 text-blue-600 font-medium py-2">
                {" "}
                Profile{" "}
              </Link>
              <button
                type="button"
                className="w-20 text-blue-600 font-medium py-2 rounded hover:bg-blue-600 hover:text-white"
                onClick={logoutHandler}
              >
                {" "}
                Logout{" "}
              </button>
            </>
          ) : (
            <>
                <Link to ="/register" className='p-2 mt-5 text-blue-600 hover:bg-blue-600 hover:text-white'>Register</Link>
                <Link to ="/login" className='px-5 py-2 border-2 border-blue-600 mt-5 rounded-xl text-blue-600 hover:bg-blue-600 hover:text-white'>Login</Link>
            </>
          )}
        </div>
      </div>
      {token && (
         <div className="text-right text-sm text-blue-600 ">
          <span className="font-semibold">Logined as </span>
          <span className="font-bold text-xl">{userInfo.username}</span>
        </div>
      )}
    </nav>
  );
};

export default nav;

