import React from "react";
import video from "../../assets/pictures/NEWYORK.mp4";

const AboutIndex = () => {
  return (
    <div>
      <div className="relative w-full">
        <video
          className="w-full  object-cover rounded-2xl"
          src={video}
          autoPlay
          loop
          muted
          playsInline
        />
       
      </div>
    
    </div>
  );
};

export default AboutIndex;
