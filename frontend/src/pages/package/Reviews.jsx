import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosClose, IoIosCreate, IoIosTrash } from "react-icons/io";
import StarRating from "./StarRating";

const Reviews = ({ id }) => {
  const [prevReview, setPrevReview] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewTitle, setReviewTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentReviewId, setCurrentReviewId] = useState(null);
  const [showAllReview, setShowAllReview] = useState(false);

  const getPrevReview = async () => {
    setLoading(true); // Set loading to true when fetching reviews
    try {
      const response = await axios.get(
        `http://localhost:3000/backend/getReview.php`,
        {
          headers: {
            "Destination-Id": id,
          },
        }
      );

      if (response.data.status === 1) {
        setPrevReview(response.data.data);
      } else {
        setError("No details found for this destination");
      }
    } catch (err) {
      setError("Failed to fetch details: " + err.message);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };
  const totalRatingData = async (totalRating) => {
    const data = {
      totalRating: parseFloat(totalRating),
      destination: parseInt(id),
    };
    try {
      const response = await axios.put(
        `http://localhost:3000/backend/updateReviewInfo.php`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === 1) {
        console.log(response.data.data);
      } else {
        setError(response.data.message);
        console.log(response.data);
      }
    } catch (err) {
      setError("Failed to add rating: " + err.message);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Calculate total stars
  const calculateRatings = () => {
    const ratingsCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    prevReview.forEach((review) => {
      if (review && review.rating) {
        // Check if review and rating exist
        ratingsCount[review.rating] += 1;
      }
    });
    return ratingsCount;
  };

  // Calculate ratings and percentage
  const ratingsCount = calculateRatings();
  const totalRatings = prevReview.length;

  // Calculate total weighted ratings
  const totalWeightedRatings = Object.keys(ratingsCount).reduce(
    (sum, rating) => {
      return sum + rating * ratingsCount[rating]; // Calculate total weighted ratings
    },
    0
  );

  const averageRating = totalRatings
    ? (totalWeightedRatings / totalRatings).toFixed(1)
    : 0; // Calculate average rating

  // Calculate percentage for each star rating
  const calculatePercentage = (count) => {
    let percentage = totalRatings === 0 ? 0 : (count / totalRatings) * 100;
    return percentage; // Return the percentage
  };
  // output stars
  const renderStars = (rating) => {
    return (
      <span className="flex">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={`text-2xl ${value <= rating ? "text-yellow-500" : "text-gray-400"
              }`}
          >
            ★
          </span>
        ))}
      </span>
    );
  };

  const handleAddReview = async (e) => {
    if (localStorage.getItem("token")) {
      e.preventDefault();

      if (rating === 0) {
        setError("Rating is required");
        return; // Prevent form submission
      }
      const data = {
        reviewTitle,
        description,
        rating,
        created_at: new Date(),
        userId: Number(localStorage.getItem("user_id")),
        destination: id,
      };

      try {
        const response = await axios.post(
          `http://localhost:3000/backend/getReview.php`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.status === 1) {
          totalRatingData(averageRating);
          setPrevReview([...prevReview, response.data.data]);
          setReviewTitle("");
          setDescription("");
          setRating(0);
          setShowReviewForm(false);
        } else {
          setError("Failed to add review");
        }
      } catch (err) {
        setError("Failed to add review: " + err.message);
      }
    } else {
      navigate("/register");
    }
  };

  const handleEditReview = (reviewId) => {
    const reviewToEdit = prevReview.find(
      (review) => review.review_id === reviewId
    );

    if (reviewToEdit) {
      setReviewTitle(reviewToEdit.review_title);
      setDescription(reviewToEdit.description);
      setRating(reviewToEdit.rating);
      setCurrentReviewId(reviewId); // Set the current review ID
      setIsEdit(true);
      setShowReviewForm(true);
    }
  };

  const handleEditForm = async (e) => {
    e.preventDefault();
    const data = {
      review_id: currentReviewId,
      reviewTitle,
      description,
      rating,
      created_at: new Date(),
      userId: localStorage.getItem("user_id"),
      destination: id,
    };

    try {
      const response = await axios.put(
        `http://localhost:3000/backend/getReview.php`,
        data,
        {
          headers: {
            " Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === 1) {
        totalRatingData(averageRating);
        const updatedReviews = prevReview.map((review) =>
          review.review_id === currentReviewId ? response.data.data : review
        );
        setPrevReview(updatedReviews);
        setReviewTitle("");
        setDescription("");
        setRating(0);
        setShowReviewForm(false);
        setIsEdit(false);
        setCurrentReviewId(null);
      } else {
        setError("Failed to update review");
      }
    } catch (error) {
      setError("Failed to update review: " + error.message);
    }
  };

  const goBackHandler = () => {
    setShowReviewForm(!showReviewForm);
    setReviewTitle("");
    setDescription("");
    setRating(0);
    setShowReviewForm(false);
    setIsEdit(false);
    setCurrentReviewId(null);
  };

  const handleDeleteReview = async (reviewId) => {
    // Logic to handle deleting the review
    try {
      const response = await axios.delete(
        `http://localhost:3000/backend/getReview.php`,
        {
          headers: {
            Review_Id: reviewId,
          },
        }
      );

      if (response.data.status === 1) {
        totalRatingData(averageRating);
        setReload(!reload);
      } else {
        setError("Failed to delete review");
      }
    } catch (err) {
      setError("Failed to delete review: " + err.message);
    }
  };

  useEffect(() => {
    getPrevReview();
  }, [showReviewForm, reload]);

  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <div className="z-50">
          {showReviewForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                <button
                  onClick={() => goBackHandler()}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                >
                  <IoIosClose size={24} />
                </button>
                <form onSubmit={isEdit ? handleEditForm : handleAddReview}>
                  <input
                    type="text"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="Review Title"
                    className="w-full p-2 mb-4 border rounded-md"
                  />
                  <StarRating setRating={setRating} />
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add your review..."
                    className="w-full p-2 mb-4 border rounded-md"
                    rows="3"
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all duration-200"
                  >
                    {isEdit ? "Edit Review" : "Submit Review"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col lg:flex-1 lg:ml-4">
          <h1 className="text-2xl font-bold mb-4">Reviews</h1>
          <div className="lg:flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400 text-xl">
                {renderStars(averageRating)}{" "}
              </span>
              <p className="text-sm font-medium text-gray-900">
                Average Rating:{" "}
                <span className="font-bold">{averageRating}</span>
              </p>
            </div>
            <p className="text-sm font-medium text-gray-500">
              {totalRatings} global ratings
            </p>
            {[5, 4, 3, 2, 1].map((star) => (
              <div className="flex items-center mb-2" key={star}>
                <span className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                  {star} ★
                </span>
                <div className="w-3/4 h-4 mx-2 bg-gray-200 rounded">
                  <div
                    className={`h-4 bg-yellow-400 rounded transition-all duration-1000 ease-in-out`}
                    style={{
                      width: `${calculatePercentage(ratingsCount[star])}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-500">
                  {calculatePercentage(ratingsCount[star]).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            {
              localStorage.getItem("token") && (
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-200"
                >
                  {showReviewForm ? "Cancel" : "Add Review"}
                </button>
              )
            }

          </div>
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-200"
            onClick={() => document.getElementById("reviews").showModal()}
          >
            Show Reviews
          </button>
          <div className="z-10">
            <dialog id="reviews" className="modal z-10">
              <div className="modal-box max-w-3xl bg-white rounded-lg shadow-lg p-6">
                <form method="dialog">
                  <button
                    className="absolute top-4 right-4 z-10 text-black hover:text-gray-800 focus:outline-none"
                    aria-label="Close"
                  >
                    <IoIosClose size={32} />
                  </button>
                </form>
                <div className="modal-action w-full flex flex-col items-center">
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="loader border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full w-8 h-8 animate-spin"></div>
                    </div>
                  ) : (
                    <div className="mt-4 space-y-4 w-full">
                      {prevReview.length > 0 ? (
                        prevReview
                          .slice()
                          .reverse()
                          .map((review, index) => (
                            <div
                              key={index}
                              className="bg-gray-800 w-full rounded-lg p-6 shadow-md"
                            >
                              <div className="flex flex-row justify-between items-center">
                                <div className="flex items-center mb-4">
                                  {review && review.profile_image ? (
                                    <img
                                      src={`http://localhost:3000/backend/${review.profile_image}`}
                                      alt="Profile"
                                      className="w-12 h-12 rounded-full border-2 border-gray-600 mr-4"
                                    />
                                  ) : (
                                    <p className="text-gray-400">
                                      No Profile Image Available
                                    </p>
                                  )}
                                  <div>
                                    <h1 className="text-white text-lg font-bold ">
                                      {review
                                        ? review.username
                                        : "Unknown User"}
                                    </h1>
                                    <p className="text-xs text-gray-300 mb-2">
                                      posted on:{" "}
                                      {review
                                        ? new Date(
                                          review.created_at
                                        ).toLocaleDateString()
                                        : "N/A"}
                                    </p>
                                  </div>
                                </div>
                                <p className="text-lg text-yellow-400 mb-2 ">
                                  {renderStars(review ? review.rating : 0)}
                                </p>
                              </div>
                              <div className="flex justify-between ">
                                <h2 className="text-xl font-semibold text-white">
                                  {review ? review.review_title : "No Title"}
                                </h2>
                              </div>

                              <p className="text-sm text-gray-200">
                                {review ? review.description : "No Description"}
                              </p>
                              {review &&
                                review.user ===
                                Number(localStorage.getItem("user_id")) ? (
                                <div className="mt-4 flex space-x-2">
                                  <form method="dialog">
                                    <button
                                      onClick={() =>
                                        handleEditReview(review.review_id)
                                      }
                                      className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 transition-all duration-200 flex items-center"
                                    >
                                      <IoIosCreate className="mr-1" />
                                      Edit
                                    </button>
                                  </form>

                                  <button
                                    onClick={() =>
                                      handleDeleteReview(review.review_id)
                                    }
                                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition-all duration-200 flex items-center"
                                  >
                                    <IoIosTrash className="mr-1" /> Delete
                                  </button>
                                </div>
                              ) : null}
                            </div>
                          ))
                      ) : (
                        <div className="text-xl text-gray-300">
                          No reviews yet.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
