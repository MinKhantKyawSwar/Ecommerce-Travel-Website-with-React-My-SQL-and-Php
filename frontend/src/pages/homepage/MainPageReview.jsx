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
        <div className="flex leading-tight justify-between px-10"></div>
        <div className="mt-6 flex justify-center gap-4 items-center space-x-5 px-10">
          {homePageReview && homePageReview.length > 0 ? (
            homePageReview.slice(0, 5).map((review, index) => (
              <div
                key={index}
                className={`${index === 2
                    ? "bg-white shadow-xl rounded-lg p-6 w-[350px] h-[340px] transform scale-105 border border-gray-300 hover:shadow-2xl"
                    : "bg-white shadow-lg rounded-lg p-4 w-[200px] h-[270px] border border-gray-200 hover:shadow-2xl"
                  } flex-shrink-0`}
              >
                {/* Destination Image */}
                <img
                  src={`http://localhost:3000/backend/${review.destination_image}`}
                  alt={`${review.city} Destination`}
                  className="w-full h-[120px] object-cover rounded-t-lg mb-4"
                />
                <div className="flex items-center ">
                  <img
                    src={`http://localhost:3000/backend/${review.profile_image}`}
                    alt={`${review.city} Destination`}
                    className={`${index === 2
                        ? "w-16 h-16 object-cover rounded-full mr-4"
                        : "w-8 h-8 object-cover rounded-full mr-2"
                      }`}
                  />
                  <div>
                    <h3
                      className={`${index === 2
                          ? "text-xl md:text-2xl font-bold text-gray-800"
                          : "text-sm md:text-xs font-bold text-gray-800"
                        }`}
                    >
                      {review.username}
                    </h3>
                    <div className="flex items-center">
                      <span className={`${index === 2 ? "text-yellow-500 text-lg" : "text-yellow-500 text-sm"}`}>
                        {"★".repeat(review.rating)}
                      </span>
                      <span className={`${index === 2 ? "text-gray-500 ml-2" : "text-gray-500 text-sm"}`}>
                        ({review.rating} / 5)
                      </span>
                    </div>
                  </div>
                </div>
                {/* Review Description */}
                <p
                  className={`${index === 2 ? "text-gray-700 text-sm" : "text-gray-700 text-xs"
                    } break-words`}
                >
                  {review.review_description}
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
