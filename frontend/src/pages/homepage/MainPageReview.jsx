import React from "react";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainPageReview = ({ homePageReview }) => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      <div className="mt-6">
        <div className="flex leading-tight justify-between px-10">

        </div>
        <div className="mt-6 flex justify-center gap-4 items-center space-x-4 px-10">
          {homePageReview && homePageReview.length > 0 ? (
            homePageReview.slice(0, 5).map((review, index) => (
              <div
                key={index}
                className={`${
                  index === 2
                    ? "bg-white shadow-xl rounded-lg p-6 w-[350px] h-[300px] transform scale-105 border border-gray-300 hover:shadow-2xl"
                    : "bg-white shadow-lg rounded-lg p-4 w-[200px] h-[250px] border border-gray-200 hover:shadow-2xl"
                } flex-shrink-0`}
              >
                {/* Destination Image */}
                <img
                  src={`http://localhost:3000/backend/${review.destination_image}`}
                  alt={`${review.city} Destination`}
                  className="w-full h-[120px] object-cover rounded-t-lg mb-4"
                />
                <div className="mb-2">
                  <h3
                    className={`${
                      index === 2
                        ? "text-xl md:text-2xl font-bold text-gray-800"
                        : "text-sm md:text-sm font-bold text-gray-800"
                    } truncate`}
                  >
                    {review.username}
                  </h3>
                  <div className="flex items-center">
                    <span className="text-yellow-500 text-lg">
                      {"★".repeat(review.rating)}
                    </span>
                    <span className="text-gray-500 ml-2">
                      ({review.rating} / 5)
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm truncate">
                  {review.description.length > 30
                    ? review.description.substring(0, 50) + "..."
                    : review.description}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MainPageReview;
