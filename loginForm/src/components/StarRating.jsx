import React, { useState } from 'react';

const StarRating = () => {
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    return value;
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