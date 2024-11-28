import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../utils/UserContext";

const nav = () => {
  const { token, updateToken } = useContext(UserContext);

  const logoutHandler = () => {
    updateToken(null);
  };

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
              <Link to={"/create"} className="text-teal-600 font-medium">
                {" "}
                SHARE NOTE{" "}
              </Link>
              <button
                type="button"
                className="text-teal-600 font-medium"
                onClick={logoutHandler}
              >
                {" "}
                LOGOUT{" "}
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

      {token && token.user_mail && (
        <p className="text-right text-sm text-teal-600">
          <span className="font-semibold">Login as </span>
          {token.user_mail}
        </p>
      )}
    </nav>
  );
};

export default nav;