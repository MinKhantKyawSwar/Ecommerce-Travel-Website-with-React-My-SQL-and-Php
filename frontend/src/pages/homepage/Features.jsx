import React from "react";
import { Link } from "react-router-dom";
import travelImgPoster1 from "../../assets/pictures/feature_poster1.png";
import travelImgPoster2 from "../../assets/pictures/feature_poster2.png";
import { MdOutlineArrowOutward, MdArrowForward } from "react-icons/md";

const Features = () => {
  return (
    <div className="grid grid-cols-2 gap-5 mb-5">
      <div className=" relative h-[32rem]">
        <img
          src={travelImgPoster1}
          alt="Travel Poster 1"
          className="h-full object-cover rounded-badge shadow-lg"
        />
        <Link
          to="/explore"
          className="absolute top-2 right-2 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-gray-50"
        >
          <span className="text-5xl">
            <MdOutlineArrowOutward />
          </span>
        </Link>
      </div>
      <div className="rounded-2xl h-[32rem]">
        <div className="relative rounded-2xl h-[17rem] mb-4">
          <img
            src={travelImgPoster2}
            alt="Travel Poster 1"
            className="w-full h-full object-cover rounded-2xl"
          />
          {
            localStorage.getItem("token") ? (
              <Link
            to="/register"
            className="absolute bottom-4 right-2 w-52 h-12 bg-white rounded-full flex items-center justify-between shadow-lg hover:shadow-xl hover:bg-gray-50 transition duration-200"
          >
            <span className="text-xl font-medium pl-4 mb-1 ">
              Register Now
            </span>
            <span className="text-4xl pr-6 ">
              <MdArrowForward />
            </span>
          </Link>
            ) :
            (
              <Link
            to="/explore"
            className="absolute bottom-4 right-2 w-52 h-12 bg-white rounded-full flex items-center justify-between shadow-lg hover:shadow-xl hover:bg-gray-50 transition duration-200"
          >
            <span className="text-xl font-medium pl-4 mb-1 ">
              Explore Now
            </span>
            <span className="text-4xl pr-6 ">
              <MdArrowForward />
            </span>
          </Link>
            )
          }
        </div>
        <div className="rounded-2xl h-[14rem] grid grid-cols-2 gap-2">
          <div className="h-full rounded-2xl">
            <img
              src={travelImgPoster1}
              alt="Travel Poster 1"
              className="h-full object-cover rounded-2xl"
            />
          </div>
          <div className="h-full rounded-2xl">
            <img
              src={travelImgPoster1}
              alt="Travel Poster 1"
              className="h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
