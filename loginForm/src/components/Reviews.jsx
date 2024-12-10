import React, { useEffect, useState } from "react";
import axios from "axios"; // Make sure to import axios
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

  const renderStars = (rating) => {
    return (
      <span className="flex">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={`text-2xl ${
              value <= rating ? "text-yellow-500" : "text-gray-400"
            }`}
          >
            ★
          </span>
        ))}
      </span>
    );
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
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
  };

  const handleEditReview = (reviewId) => {
    setShowReviewForm(true);
    // Logic to handle editing the review
    // You might want to set the review data in the state to pre-fill the form
    const reviewToEdit = prevReview.find((review) => review.id === reviewId);
    if (reviewToEdit) {
      setReviewTitle(reviewToEdit.review_title);
      setDescription(reviewToEdit.description);
      setRating(reviewToEdit.rating);
      setShowReviewForm(true); // Show the form to edit
    }
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
        setReload(!reload);
      } else {
        setError("Failed to delete review");
      }
    } catch (err) {
      setError("Failed to delete review: " + err.message);
    }
  };

  const goToBack = () => {
    setShowReviewForm(true);
  };

  useEffect(() => {
    getPrevReview();
  }, [showReviewForm, reload]); // Fetch reviews when the component mounts or when the id changes

  return (
    <div className="mt-10">
      <button
        onClick={() => setShowReviewForm(!showReviewForm)}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-200"
      >
        {showReviewForm ? "Cancel" : "Add Review"}
      </button>
      {showReviewForm && (
        <form className="fixed bg-slate-600 top-1/4 w-1/2 left-1/4 p-4 rounded-lg shadow-lg">
          <input
            type="text"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
            placeholder="Review Title"
            className="w-full p-2 rounded-md bg-gray-600 text-white"
          />
          <StarRating setRating={setRating} />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add your review..."
            className="w-full p-2 rounded-md bg-gray-600 text-white"
            rows="3"
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-200"
          >
            Submit Review
          </button>
        </form>
      )}
      <h1 className="text-white text-xl font-bold">Reviews</h1>
      {loading && <p className="text-gray-300">Loading reviews...</p>}{" "}
      {/* Loading indicator */}
      {error && <p className="text-red-500">{error}</p>} {/* Error message */}
      <div className="mt-4 space-y-4">
        {prevReview.length > 0 ? (
          prevReview.map((review, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                {review && review.profile_image ? (
                  <img
                    src={`http://localhost:3000/backend/${review.profile_image}`}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-gray-600 mr-4"
                  />
                ) : (
                  <p>No Profile Image Available</p>
                )}
                <h1 className="text-white text-lg font-bold">
                  {review ? review.username : "Unknown User"}
                </h1>
              </div>
              <div className="flex justify-between">
                <h2 className="text-2xl font-semibold text-white">
                  {review ? review.review_title : "No Title"}
                </h2>
                <p className="text-lg text-yellow-400 mb-2">
                  {renderStars(review ? review.rating : 0)}
                </p>
              </div>
              <p className="font-medium text-gray-300 mb-2">
                Date:{" "}
                {review
                  ? new Date(review.created_at).toLocaleDateString()
                  : "N/A"}
              </p>
              <p className="text-sm text-gray-200">
                {review ? review.description : "No Description"}
              </p>
              {
                review &&
                review.user === Number(localStorage.getItem("user_id")) ? ( // Check if review is defined
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => handleEditReview(review.review_id)} // Function to handle edit
                      className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 transition-all duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review.review_id)} // Function to handle delete
                      className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition-all duration-200"
                    >
                      Delete
                    </button>
                  </div>
                ) : null // Use null instead of an empty string
              }
            </div>
          ))
        ) : (
          <div className="text-xl text-gray-300">No reviews yet.</div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
