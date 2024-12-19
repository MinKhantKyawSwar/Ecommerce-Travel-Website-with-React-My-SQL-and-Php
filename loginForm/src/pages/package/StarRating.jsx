import React, { useState } from 'react';

const StarRating = ({ setRating }) => {
  const [rating, setLocalRating] = useState(0);

  const handleClick = (value) => {
    setLocalRating(value);
    setRating(value); // Call the passed function to update the rating in Details
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          onClick={() => handleClick(value)}
          className={`cursor-pointer text-2xl ${value <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
        >
          ★
        </span>
      ))}
      <input type="hidden" name="rating" value={rating} />
    </div>
  );
};

export default StarRating;

