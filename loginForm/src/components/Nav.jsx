import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../utils/UserContext";
import axios from "axios";


const nav = () => {
  const { token, updateToken, userInfo, setUserInfo } = useContext(UserContext);

  const logoutHandler = () => {
    updateToken(null);
    localStorage.removeItem("token");
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
        // console.log(response.data.customer);
        return response.data.customer
      } else {
        console.error("Failed to fetch user ID:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user ID:", error.message);
    }
  };

  useEffect((_)=>{
    getUserId();
  },[])


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
              <Link to={"/profile"} className="text-blue-600 font-medium">
                {" "}
                Profile{" "}
              </Link>
              <button
                type="button"
                className="text-blue-600 font-medium"
                onClick={logoutHandler}
              >
                {" "}
                Logout{" "}
              </button>
            </>
          ) : (
            <>
                <Link to ="/register" className='p-2 mt-5 text-blue-600'>Register</Link>
                <Link to ="/login" className='px-5 py-2 border-2 border-blue-600 mt-5 rounded-xl text-blue-600 hover:'>Login</Link>
            </>
          )}
        </div>
      </div>
      {token && (
         <div className="text-right text-sm text-blue-600 ">
          <span className="font-semibold">Login as </span>
          <span className="font-bold text-xl">{userInfo.username}</span>
        </div>
      )}
    </nav>
  );
};

export default nav;