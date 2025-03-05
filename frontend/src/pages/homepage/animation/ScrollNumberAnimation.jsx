import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ScrollNumberAnimation = ({ targetNumber }) => {
  const [count, setCount] = useState(0); // Start at 0
  const { ref, inView } = useInView({
    triggerOnce: false, // Allow multiple triggers when the element comes into view
    threshold: 0.5, // Trigger when 50% of the element is in view
  });

  useEffect(() => {
    let interval;
    
    if (inView) {
      setCount(0); // Reset count to 0 each time element comes into view
      
      // Calculate the interval time so the count reaches targetNumber in 1 second
      const intervalTime = 500 / targetNumber; // 1000ms (1 second) divided by targetNumber for each increment

      interval = setInterval(() => {
        setCount(prevCount => {
          if (prevCount < targetNumber) {
            return prevCount + 1;
          } else {
            clearInterval(interval); // Stop the interval once target is reached
            return prevCount;
          }
        });
      }, intervalTime); // Use calculated interval time

    }

    return () => {
      clearInterval(interval); // Cleanup the interval on unmount or when it's no longer in view
    };
  }, [inView, targetNumber]); // Trigger every time the element comes into view

  return (
    <motion.h1
      ref={ref}
      className="text-5xl font-bold text-white my-4"
      transition={{ duration: 0.3 }}
    >
      <motion.span
        key={count}
        transition={{ duration: 0.3 }}
      >
        {count}
      </motion.span>
      <span>+</span>
    </motion.h1>
  );
};

export default ScrollNumberAnimation;
