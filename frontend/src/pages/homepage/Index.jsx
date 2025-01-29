import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import Hero from "./Hero";
import FunPlaces from "./FunPlaces";
import TopRatedDestinations from "./TopRatedDestinations";
import Features from "./Features";
import WebsiteInfo from "./WebsiteInfo";
import TravelImage1 from "../../assets/pictures/1.png";
import TravelImage2 from "../../assets/pictures/2.png";
import TravelImage3 from "../../assets/pictures/3.png";
import TravelImage4 from "../../assets/pictures/4.png";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Topdata from "./Topdata";
import MainPageReview from "./MainPageReview";

const Index = () => {
  const [destinations, setDestinations] = useState([]);
  const [topDestinations, setTopDestinations] = useState([]);
  const [topDataDestinations, setTopDataDestinations] = useState([]);
  const [travellers, setTravellers] = useState([]);
  const [homePageReview, setHomePageReview] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const [destinationCount, setDestinationCount] = useState([]);
  const [packagesCount, setPackagesCount] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getAllCustomerInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getUserInfo.php"
      );

      if (response.data.status === 1) {
        const customers = response.data.data.slice(0, 5); // Get only the first 5 customers
        setCustomers(customers);
      } else {
        setError("No data found");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getPackageCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/dashboard.php",
        {
          headers: {
            "Content-Type": "application/json",
            "Packages-Id": "",
          },
        }
      );
      if (response.data.status === 1) {
        setPackagesCount(response.data.total_packages);
      } else {
        setError("No data found for packages");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    }
  };

  const getDestinationCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/dashboard.php",
        {
          headers: {
            "Content-Type": "application/json",
            Total_Destination: "",
          },
        }
      );
      if (response.data.status === 1) {
        setDestinationCount(response.data.data[0]);
      } else {
        setError("No data found for packages");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    }
  };

  const getDestinations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/backend/getIndexInfo.php"
      );

      if (response.data.status === 1) {
        const destinations = response.data.data;

        // Shuffle the array to get random items
        const shuffledDestinations = destinations.sort(
          () => 0.5 - Math.random()
        );

        // Filter to get unique destination IDs
        const uniqueDestinations = [];
        const destinationIds = new Set();

        for (let destination of shuffledDestinations) {
          if (!destinationIds.has(destination.destination_id)) {
            uniqueDestinations.push(destination);
            destinationIds.add(destination.destination_id);
          }

          // Stop once we have 4 unique destinations
          if (uniqueDestinations.length === 8) break;
        }

        // Set the random destinations
        setDestinations(uniqueDestinations);
      } else {
        setError("No data found");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getTopDestinations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/backend/getIndexInfo.php"
      );

      if (response.data.status === 1) {
        const destinations = response.data.data;

        // Sort destinations by rating in descending order
        const sortedDestinations = destinations // Filter destinations with rating greater than 3
          .sort((a, b) => b.rating - a.rating); // Sort by rating, highest first

        // Get the top 8 unique destinations
        const topDestinationsArr = [];
        const destinationIds = new Set();

        for (let destination of sortedDestinations) {
          if (!destinationIds.has(destination.destination_id)) {
            topDestinationsArr.push(destination);
            destinationIds.add(destination.destination_id);
          }

          // Stop once we have 8 unique destinations
          if (topDestinationsArr.length === 8) break;
        }

        // Set the top destinations
        setTopDestinations(topDestinationsArr);
      } else {
        setError("No data found");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getTopDataDestinations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/backend/getIndexInfo.php"
      );

      if (response.data.status === 1) {
        const destinations = response.data.data;

        // Shuffle the array to get random items
        const shuffledDestinations = destinations.sort(
          () => 0.5 - Math.random()
        );

        // Filter to get unique destination IDs
        const uniqueDestinations = [];
        const destinationIds = new Set();

        for (let destination of shuffledDestinations) {
          if (!destinationIds.has(destination.destination_id)) {
            uniqueDestinations.push(destination);
            destinationIds.add(destination.destination_id);
          }

          // Stop once we have 4 unique destinations
          if (uniqueDestinations.length === 3) break;
        }

        // Set the random destinations
        setTopDataDestinations(uniqueDestinations);
      } else {
        setError("No data found");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDetails = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/backend/getDestination.php?id=${id}`
      );

      if (response.data.status === 1) {
        setSelectedDestination(response.data.data);
        navigate(`/destination/${id}`);
      } else {
        setError("No details found for this destination");
      }
    } catch (err) {
      setError("Failed to fetch details: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Customer Count
  const getCustomerCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getCustomerCount.php",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === 1) {
        setTravellers(response.data.data);
      } else {
        setError("No data found for customers");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    }
  };


  // Fetch review
  const homePageReviews = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/homePageReviews.php",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === 1) {
        setHomePageReview(response.data.data);
      } else {
        setError("No data found for customers");
      }
    } catch (err) {
      setError("Failed to fetch data: " + err.message);
    }
  };

  // Trigger data fetching on component mount
  useEffect(() => {
    getDestinations();
    getAllCustomerInfo();
    getTopDestinations();
    getPackageCount();
    getCustomerCount();
    getDestinationCount();
    getTopDataDestinations();
    homePageReviews();
  }, []);

  // if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;


  // animations
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 }); // Adjust threshold as needed

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  // travel image carousel
  const images = [TravelImage1, TravelImage2, TravelImage3, TravelImage4];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop to the first image after the last
      setIsTransitioning(false);
    }, 1500); // Match this timeout to the CSS transition duration
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Slide every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <>
      <div className="absolute top-48 right-1/2 transform translate-x-1/2">
        {loading && (
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#000000"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
      </div>
      {!loading && (
        <>
          <div>
            <Hero customers={customers} />
            <div className="mt-6 max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Image Section */}
              <div className="relative overflow-hidden h-[24rem] md:h-[36rem]">
                <div
                  className={`flex ml-24 h-full transition-transform duration-[1500ms] ease-in-out ${isTransitioning ? `transform -translate-x-${currentIndex * 100}%` : ""
                    }`}
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`, // Move to the current index
                  }}
                >
                  {images.map((image, index) => (
                    <div key={index} className="w-full h-full flex-shrink-0">
                      <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Text Section */}
              <div className="flex flex-col text-center md:text-left space-y-6">
                <motion.h1
                  ref={ref}
                  className="font-sans text-3xl md:text-6xl font-extrabold leading-tight text-gray-900"
                  initial="hidden"
                  animate={controls}
                  variants={variants}
                >
                  Discover the world's wonders
                </motion.h1>
                <p className="text-base md:text-lg text-gray-600">
                  Embark on a journey like no other. Explore breathtaking landscapes, rich cultures, and unforgettable experiences with our travel packages.
                </p>
                <div>
                  <Topdata
                    topDataDestinations={topDataDestinations}
                    handleDetails={handleDetails}
                  />
                </div>
              </div>
            </div>

            <div className="mt-12 px-4 md:px-0">
              <h2 className="text-xl md:text-2xl text-center font-bold text-gray-800 uppercase tracking-wide">
                Check Out Reviews
              </h2>
              <MainPageReview homePageReview={homePageReview} />
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-12">
              <WebsiteInfo
                packagesCount={packagesCount}
                travellers={travellers}
                destinationCount={destinationCount}
              />
              <TopRatedDestinations
                topDestinations={topDestinations}
                handleDetails={handleDetails}
              />
              <div className="mb-10">
                <Features />
              </div>
              <FunPlaces
                destinations={destinations}
                handleDetails={handleDetails}
              />
            </div>
          </div>
        </>
      )}

    </>
  );
};

export default Index;