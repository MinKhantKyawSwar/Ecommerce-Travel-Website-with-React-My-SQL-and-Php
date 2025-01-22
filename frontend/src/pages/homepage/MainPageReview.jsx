import React from "react";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";

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
        <div className="flex leading-tight justify-between px-4 md:px-10"></div>
        <div className="mt-6 flex flex-wrap justify-center gap-4 items-center px-4 md:px-10">
          {homePageReview && homePageReview.length > 0 ? (
            homePageReview.slice(0, 5).map((review, index) => (
              <div
                key={index}
                className={`${index === 2
                  ? "bg-white shadow-xl rounded-lg p-6 w-full md:w-[350px] h-[350px] transform scale-105 border border-gray-300 hover:shadow-2xl"
                  : "bg-white shadow-lg rounded-lg p-4 w-full md:w-[200px] h-[280px] border border-gray-200 hover:shadow-2xl"
                  } flex-shrink-0`}
              >
                {/* Destination Image */}
                <img
                  src={`http://localhost:3000/backend/${review.destination_image}`}
                  alt={`${review.city} Destination`}
                  className="w-full h-[120px] object-cover rounded-t-lg mb-4"
                />
                <div className="flex justify-between">
                  <div className="flex text-gray-800">
                    <RiDoubleQuotesL className={`${index === 2 ? "text-2xl" : "text-lg"}`} />
                  </div>
                  <div className="flex text-gray-800">
                    <RiDoubleQuotesR className={`${index === 2 ? "text-2xl" : "text-lg"}`} />
                  </div>
                </div>
                <p
                  className={`${index === 2
                    ? "h-24 text-gray-700 text-base md:text-lg font-bold text-center p-3"
                    : "h-16 text-gray-700 text-sm text-center p-3"
                    } break-words`}
                >
                  {review.review_description.length > 44
                    ? review.review_description.substring(0, 44) + "..."
                    : review.review_description}
                </p>

                <div className="flex items-center">
                  <img
                    src={`http://localhost:3000/backend/${review.profile_image}`}
                    alt={`${review.city} Destination`}
                    className={`${index === 2
                      ? "w-12 h-12 object-cover rounded-full mr-2"
                      : "w-8 h-8 object-cover rounded-full mr-2"
                      }`}
                  />
                  <div className="flex flex-col justify-center">
                    <h3
                      className={`${index === 2
                        ? "text-base md:text-xl font-bold text-gray-800"
                        : "text-sm md:text-xs font-bold text-gray-800"
                        }`}
                    >
                      {review.username}
                    </h3>
                    <div className="flex items-center">
                      <span className={`${index === 2 ? "text-yellow-500 text-lg" : "text-yellow-500 text-sm"}`}>
                        {"★".repeat(review.rating)}
                      </span>
                      <span className={`${index === 2 ? "text-gray-500 ml-2" : "text-gray-500 text-sm ml-2"}`}>
                        ({review.rating} / 5)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center w-full">
              No reviews available.
            </p>
          )}
        </div>
      </div>
    </>

  );
};

export default MainPageReview;
