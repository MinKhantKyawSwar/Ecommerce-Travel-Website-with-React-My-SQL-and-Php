import React from 'react'

const AddReview = () => {
  return (
    <div className='fixed'>
          <button
        onClick={() => setShowReviewForm(!showReviewForm)}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-200"
      >
        {showReviewForm ? "Cancel" : "Add Review"}
      </button>
      {showReviewForm && (
        <form onSubmit={handleAddReview} className="mt-6">
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
    </div>
  )
}

export default AddReview