import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import Hero from "./Hero";
import FunPlaces from "./FunPlaces";
import TopRatedDestinations from "./TopRatedDestinations";
import Features from "./Features";
import WebsiteInfo from "./WebsiteInfo";

const Index = () => {
  const [destinations, setDestinations] = useState([]);
  const [topDestinations, setTopDestinations] = useState([]);
  const [travellers, setTravellers] = useState([]);
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
        console.log(customers);
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
            "Total_Destination": "",
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
          if (uniqueDestinations.length === 4) break;
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


        // Filter to get unique destination IDs
        const topDestinationsArr = [];
        const destinationIds = new Set();

        for (let destination of destinations) {
          if (!destinationIds.has(destination.destination_id)) {
            if (destination.rating > 3) {
              topDestinationsArr.push(destination);
              destinationIds.add(destination.destination_id);
            }
          }

          // Stop once we have 4 unique destinations
          if (topDestinationsArr.length === 4) break;
        }
        const topRating = topDestinationsArr.sort();
        // Set the random destinations
        setTopDestinations(topRating);
        console.log(topRating)
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

  // Trigger data fetching on component mount
  useEffect(() => {
    getDestinations();
    getAllCustomerInfo();
    getTopDestinations();
    getPackageCount();
    getCustomerCount();
    getDestinationCount();
  }, []);

  // if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

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
          <div className="bg-gray-50">
            <Hero customers={customers} />

            <div className="max-w-7xl mx-auto px-4 py-16">
              <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-blue-600">
                  Explore the World
                </h1>
                <p className="text-lg text-gray-700 mt-4">
                  Find the best destinations and plan your next adventure.
                </p>
              </header>
              <div>
                <WebsiteInfo packagesCount={packagesCount} travellers={travellers} destinationCount={destinationCount}/>
              </div>
              <div>
                <Features />
              </div>
              <h2 className="text-3xl font-bold text-center mb-8">
                Available Destinations
              </h2>
              <div>
                <TopRatedDestinations topDestinations={topDestinations} handleDetails={handleDetails} />
              </div>
              <div>
                <FunPlaces destinations={destinations} handleDetails={handleDetails} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Index;
