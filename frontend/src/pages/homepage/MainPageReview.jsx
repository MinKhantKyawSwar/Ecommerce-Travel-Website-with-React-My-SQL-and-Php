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
        <div className="flex leading-tight justify-between px-10"></div>
        <div className="mt-6 flex justify-center gap-4 items-center space-x-5 px-10">
          {homePageReview && homePageReview.length > 0 ? (
            homePageReview.slice(0, 5).map((review, index) => (
              <div
                key={index}
                className={`${index === 2
                  ? "bg-white shadow-xl rounded-lg p-6 w-[350px] h-[350px] transform scale-105 border border-gray-300 hover:shadow-2xl"
                  : "bg-white shadow-lg rounded-lg p-4 w-[200px] h-[280px] border border-gray-200 hover:shadow-2xl"
                  } flex-shrink-0`}
              >
                {/* Destination Image */}
                <img
                  src={`http://localhost:3000/backend/${review.destination_image}`}
                  alt={`${review.city} Destination`}
                  className="w-full h-[120px] object-cover rounded-t-lg mb-4"
                />
                <div className="flex flex-row justify-between">
                  <div className={`${index === 2 ? "flex justify-start text-2xl text-gray-800" : "flex justify-start text-lg text-gray-800"}`}>
                    <RiDoubleQuotesL />
                  </div>
                  <div className={`${index === 2 ? "flex justify-end text-2xl text-gray-800" : "flex justify-end text-lg text-gray-800"}`}>
                    <RiDoubleQuotesR />
                  </div>
                </div>
                <p
                  className={`${index === 2
                      ? "h-24 text-gray-700 text-sm text-center p-3"
                      : "h-14 text-gray-700 text-xs text-center p-3"
                    } break-words`}
                >
                 {
                  review.review_description.length > 52 ? ( review.review_description.substring(0, 52) + "...") : review.review_description
                 }
                </p>


                <div className="flex items-center ">
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
                        ? "text-xl md:text-xl font-bold text-gray-800"
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
