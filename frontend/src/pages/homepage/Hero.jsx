import React from "react";
import video from "../../assets/pictures/the_world.mp4";
import { Link } from "react-router-dom"

const Hero = ({ customers }) => {
  return (
    <div>
      <div className="relative top-0 md:mt-4 w-full mb-5">
        {/* right-[28%] */}
        <div className="absolute bottom-72 lg:bottom-16 left-16 md:left-20">
          <div className="flex justify-center md:mt-4">
            {customers.map((customer, index) => (
              <div key={index} className="-mx-1 mt-2 md:mt-0">
                {" "}
                {/* Negative margin for overlap */}
                <img
                  src={`http://localhost:3000/backend/${customer.profile_image}`}
                  alt="profile"
                  className="rounded-full h-5 w-5 md:h-8 md:w-8 border-2 border-gray-300"
                />
              </div>
            ))}
            <p className="text-white text-xs ml-2">
              more than 1000 travellers <br />
              had travelled with trailblazers!
            </p>
          </div>
        </div>
        <video
          className="w-full md:h-[35rem] object-cover rounded-2xl"
          src={video}
          autoPlay
          loop
          muted
          playsInline
        />
        <Link
          to="/explore"
          className="absolute bottom-8 md:bottom-9 left-[80%] md:left-[85%] transform -translate-x-1/2 inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
        >
          <span className="relative py-2 md:py-3 px-8 text-xs md:text-lg md:px-16 transition-all ease-in duration-75 text-white bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Explore
          </span>
        </Link>
      </div>

    </div>
  );
};

export default Hero;
