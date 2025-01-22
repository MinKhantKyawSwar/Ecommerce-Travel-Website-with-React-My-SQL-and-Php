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
   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:mb-5 h-full md:h-[38rem]">
  {/* Left Side Video */}
  <div className="relative h-[10rem] md:h-[38rem]">
    <video
      className="w-full h-full object-cover rounded-2xl"
      src={AIvideo}
      autoPlay
      loop
      muted
      playsInline
      aria-label="Promotional travel video"
    />
  </div>

  {/* Right Side Section */}
  <div className="rounded-2xl h-[38rem]">
    {/* About Section */}
    <div className="relative rounded-2xl mb-6">
      <AboutIndex />
    </div>

    {/* Image Grid and Buttons */}
    <div className="rounded-2xl h-[15rem] grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
      {/* Left Image with Button */}
      <div className="relative h-full rounded-2xl">
        <img
          src={travelImgPoster2}
          alt="Travel destination poster"
          className="w-full h-full object-cover rounded-2xl"
        />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
          {!localStorage.getItem("token") ? (
            <Link
              to="/register"
              className="w-2/3 sm:w-1/2 bg-white rounded-full flex items-center justify-between shadow-lg hover:shadow-xl hover:bg-gray-50 transition duration-200 px-4 py-2"
            >
              <span className="text-sm font-medium">Register</span>
              <MdArrowForward className="text-3xl" />
            </Link>
          ) : (
            <Link
              to="/explore"
              className="w-2/3 sm:w-1/2 bg-white rounded-full flex items-center justify-between shadow-lg hover:shadow-xl hover:bg-gray-50 transition duration-200 px-4 py-2"
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
          alt="Another travel destination poster"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    </div>
  </div>
</div>

  );
};

export default Features;
