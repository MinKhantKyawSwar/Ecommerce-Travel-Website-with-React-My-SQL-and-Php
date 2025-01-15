import React from "react";
import { Link } from "react-router-dom";
import travelImgPoster1 from "../../assets/pictures/feature_poster1.png";
import travelImgPoster2 from "../../assets/pictures/feature_poster2.png";
import travelImgPoster3 from "../../assets/pictures/discount.gif";
import { MdOutlineArrowOutward, MdArrowForward } from "react-icons/md";
import AIvideo from "../../assets/pictures/future.mp4";
import AboutIndex from "./AboutIndex";

const Features = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:mb-5 h-full md:h-[36rem]">
      {/* Left Side Image */}
      <div className="relative h-[10rem] md:h-[30rem]">
        {/* <img
          src={travelImgPoster1}
          alt="Travel Poster 1"
          className="h-[37rem] w-full object-cover rounded-lg shadow-lg"
        /> */}
        <video
          className="w-full object-cover rounded-2xl"
          src={AIvideo}
          autoPlay
          loop
          muted
          playsInline
        />

        <Link
          to="/chatbot"
          className="absolute top-2 right-2 w-10 h-10 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-gray-50"
        >
          <span className="text-2xl md:text-4xl">
            <MdOutlineArrowOutward />
          </span>
        </Link>
      </div>

      {/* Right Side Section */}
      <div className="rounded-2xl h-[36rem]">
        {/* About Section */}
        <div className="relative rounded-2xl  mb-6">
          <AboutIndex />
        </div>

        {/* Image Grid and Buttons */}
        <div className="rounded-2xl h-[15rem] grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7">
          {/* Left Image with Register/Explore Button */}
          <div className="relative h-full rounded-2xl">
            <img
              src={travelImgPoster2}
              alt="Travel Poster 2"
              className="w-full h-full object-cover rounded-2xl"
            />
            {/* Conditional Button: Register/Explore */}
            <div className="absolute bottom-4 left-36 w-full flex justify-between">
              {!localStorage.getItem("token") ? (
                <Link
                  to="/register"
                  className="w-1/2 bg-white rounded-full flex items-center justify-between shadow-lg hover:shadow-xl hover:bg-gray-50 transition duration-200 px-4 py-2"
                >
                  <span className="text-sm font-medium">Register</span>
                  <MdArrowForward className="text-3xl" />
                </Link>
              ) : (
                <Link
                  to="/explore"
                  className="w-full sm:w-1/2 bg-white rounded-full flex items-center justify-between shadow-lg hover:shadow-xl hover:bg-gray-50 transition duration-200 px-4 py-2"
                >
                  <span className="text-sm font-medium">Explore</span>
                  <MdArrowForward className="text-3xl" />
                </Link>
              )}
            </div>
          </div>

          {/* Right Image */}
          <div className="h-full rounded-2xl">
            <img
              src={travelImgPoster3}
              alt="Travel Poster 1"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
