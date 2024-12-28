import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify"; // Ensure toast is imported
import * as Yup from "yup";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import StyledErrorMessage from "../../utils/StyledErrorMessage";

const Booking = () => {
  const [redirect, setRedirect] = useState(false);
  const [payment, setPayment] = useState([]);
  const [locationInfo, setLocationInfo] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [region, setRegion] = useState([]);
  const [basePrice, setBasePrice] = useState(0);
  const [addOn, setAddOn] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [discountAdded, setDiscountAdded] = useState(false);
  const [availability, setAvailability] = useState([]);
  const [bookingId, setBookingId] = useState(0);

  const [travelDate, setTravelDate] = useState(null);
  const [availableDates, setAvailableDates] = useState(null);
  const [travelDateSelected, setTravelDateSelected] = useState(false); // State to track if travel date is selected

  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentPackage, setCurrentPackage] = useState([]);
  const [totalPeople, setTotalPeople] = useState(1);
  const [selectedRegionPrice, setSelectedRegionPrice] = useState(
    currentPackage.price
  );
  const [selectedAddOnPrice, setSelectedAddOnPrice] = useState(0);
  const [selectedDiscountPercentage, setSelectedDiscountPercentage] =
    useState(0);
  const [addOnId, setAddOnId] = useState(0);
  const [discountId, setDiscountId] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams(); // package id from url

  const initialValues = {
    travel_date: "",
    country: "",
    city: "",
    payment_method: "",
    number_of_people: 1,
    add_on: "",
    discount: "",
  };

  const AuthFormSchema = Yup.object().shape({
    travel_date: Yup.string().required("Travel date is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    payment_method: Yup.string().required("Payment method is required"),
    number_of_people: Yup.number()
      .min(1, "At least one person is required")
      .required("Number of people is required"),
    add_on: Yup.string().nullable(),
    discount: Yup.string().nullable(),
  });

  const getRegionInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getBooking.php",
        {
          headers: {
            Region: "",
          },
        }
      );

      if (response.data.status === 0) {
        console.log(response.data);
      } else if (response.data.status === 1) {
        setRegion(response.data.data);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const getLocationInfo = async (travelDate) => {
    try {
      const formattedTravelDate = travelDate
        ? travelDate.toISOString().split("T")[0]
        : null;
      const response = await axios.get(
        "http://localhost:3000/backend/getBooking.php",
        {
          headers: {
            Location_info: formattedTravelDate,
            Package_Id: id,
          },
        }
      );

      if (response.data.status === 0) {
        console.log(response.data);
      } else if (response.data.status === 1) {
        setLocationInfo(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const getAvailabilityInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getBooking.php",
        {
          headers: {
            Availability: id,
            TravelDate: travelDate,
          },
        }
      );

      if (response.data.status === 0) {
      } else if (response.data.status === 1) {
        setAvailability(response.data.data[0].number_of_available_people);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const getPaymentInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getBooking.php",
        {
          headers: {
            Payment: "",
          },
        }
      );

      if (response.data.status === 0) {
        console.log(response.data);
      } else if (response.data.status === 1) {
        setPayment(response.data.data);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const getAddOnInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getBooking.php",
        {
          headers: {
            Add_on: "",
          },
        }
      );

      if (response.data.status === 0) {
        console.log(response.data);
      } else if (response.data.status === 1) {
        setAddOn(response.data.data);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // getting available
  const getAvailableDates = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getAvailableDate.php",
        {
          headers: {
            "Content-Type": "application/json",
            "Packages-Id": id,
          },
        }
      );

      if (response.data.status === 1) {
        // Map through the data and format the travel_date directly
        const formattedDates = response.data.data.map((item) => {
          // Create a date object from the travel_date
          const date = new Date(item.travel_date);
          // Adjust the date to local time
          const localDate = new Date(
            date.getTime() + date.getTimezoneOffset() * 60000
          );
          return format(localDate, "MM/dd/yyyy"); // Format the date
        });

        setAvailableDates(formattedDates); // Update state with formatted dates
        console.log(formattedDates); // Log the formatted dates
      }
    } catch (error) {
      console.error("Error fetching available dates:", error);
    }
  };
  const getDiscountInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getBooking.php",
        {
          headers: {
            Discount: "",
          },
        }
      );

      if (response.data.status === 0) {
        console.log(response.data);
      } else if (response.data.status === 1) {
        setDiscount(response.data.data);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const getPackageInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getPackages.php",
        {
          headers: {
            "Package-Id": id,
          },
        }
      );

      if (response.data.status === 0) {
        console.log(response.data);
      } else if (response.data.status === 1) {
        setTotalPrice(response.data.data[0].price);
        setCurrentPackage(response.data.data[0]);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const getDataChange = (e) => {
    try {
      const { name, value } = e.target;
      let addOnPrice = 0;
      let discountedPercentage = 0;

      if (name === "country" && value) {
        setCountryData(value);
      }

      if (name === "city" && value) {
        // Check if name is "city" and value is not empty
        const selectedLocationId = Number(value); // Convert value to a number

        // Check if locationInfo is defined and is an array
        if (Array.isArray(locationInfo)) {
          // Find the location that matches the selected location ID
          const selectedLocation = locationInfo.find(
            (location) => location.location_id === selectedLocationId
          );

          // If a matching location is found, set the base price
          if (selectedLocation) {
            setBasePrice(selectedLocation.price);
          }
          setTotalPrice(basePrice);
        }
      }

      // Update selected add-on
      if (name === "add_on" && value) {
        const selectedAddOnData = addOn.find((add) => add.add_on === value);
        if (selectedAddOnData) {
          addOnPrice = selectedAddOnData.price;
          setAddOnId(selectedAddOnData.add_on_id);
          setSelectedAddOnPrice(addOnPrice);
        }
      }

      // Update number of people
      if (name === "number_of_people") {
        const newTotalPeople = Math.max(1, parseInt(value) || 1);
        setTotalPeople(newTotalPeople);
      }

      // Update travel date
      if (name === "travel_date" && value) {
        const selectedTravelDate = new Date(value);
        const formattedDate = selectedTravelDate.toISOString().split("T")[0];
        setTravelDateSelected(true);
        setTravelDate(formattedDate); // Assuming you have a state setter for travel date
      }

      if (name === "discount" && value) {
        setDiscountAdded(true);
        const selectedDiscountData = discount.find(
          (discount) => discount.discount_name === value
        );
        if (selectedDiscountData) {
          discountedPercentage = selectedDiscountData.percentage;
          setSelectedDiscountPercentage(discountedPercentage);
          setDiscountId(selectedDiscountData.discount_id);
        }
      }
    } catch (error) {
      console.error("Price calculation error:", error);
    }
  };

  const calculateTotalPrice = () => {
    let totalPriceCalculation = 0;
    let priceAfterDiscountCalculation = 0;

    if (discountAdded) {
      totalPriceCalculation = Math.round(
        (basePrice + selectedAddOnPrice) * totalPeople
      );
      priceAfterDiscountCalculation = Math.round(
        totalPriceCalculation * (selectedDiscountPercentage / 100)
      );

      setTotalPrice(totalPriceCalculation - priceAfterDiscountCalculation);
      setDiscountedPrice(totalPriceCalculation);
    } else {
      totalPriceCalculation = Math.round(
        (basePrice + selectedAddOnPrice) * totalPeople
      );
      setTotalPrice(totalPriceCalculation);
    }
  };

  const submitHandler = async (values) => {
    const { city, payment_method, number_of_people, travel_date } = values;

    // Prepare the data object
    const data = {
      user_id: localStorage.getItem("user_id"),
      package: Number(id),
      booking_date: new Date(),
      travel_date,
      city,
      payment_method,
      number_of_people,
      add_on: addOnId,
      discount: discountId,
      total_price: totalPrice,
    };

    const toastFire = (message) => {
      toast.success(message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    };

    const toastError = (message) => {
      toast.error(message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    };

    try {
      // Make the booking request
      const response = await axios.post(
        "http://localhost:3000/backend/getBooking.php",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle the response
      if (response.data.status === 0) {
        toast.error(response.data.message);
      } else if (response.data.status === 1) {
        console.log(response.data);
        toastFire(response.data.message);
      } else if (response.data.status === 6) {
        toast.error(response.data.message);
      }

      // Fetch transaction data
      const dataResponse = await axios.get(
        "http://localhost:3000/backend/getTransactions.php",
        {
          headers: {
            "User": Number(localStorage.getItem("user_id")),
          },
        }
      );
      // Handle transaction response
      if (dataResponse.data.status === 0) {
        toast.error(dataResponse.data.message);
      } else if (dataResponse.data.status === 1) {
        setBookingId(dataResponse.data.data[0].booking_id);
        setTimeout(() => setRedirect(true), 1500); // Redirect after 1.5 seconds
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error);
    }
  };

  const handleDateSelect = (date, setFieldValue) => {
    setTravelDate(date); // Set the state with the Date object
    setFieldValue("travel_date", date); // Update Formik's travel_date field
  };

  useEffect(() => {
    getPaymentInfo();
    getRegionInfo();
    getAddOnInfo();
    getPackageInfo();
    getDiscountInfo();
    getAvailableDates();
  }, []);

  useEffect(() => {
    getAvailabilityInfo();
    getLocationInfo(travelDate);
  }, [travelDate]);

  useEffect(() => {
    setTotalPrice(basePrice);
  }, [basePrice]);

  useEffect(
    (_) => {
      calculateTotalPrice();
    },
    [
      selectedAddOnPrice,
      selectedDiscountPercentage,
      selectedRegionPrice,
      selectedAddOnPrice,
      totalPeople,
    ]
  );

  if (redirect) {
    navigate(`/recipts/${bookingId}`);
  }

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
      <Formik
        initialValues={initialValues}
        validationSchema={AuthFormSchema}
        onSubmit={(values) => submitHandler(values)}
      >
        {({ setFieldValue }) => (
          <Form
            className="w-full max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"
            onChange={getDataChange}
          >
            <h1 className="text-center font-semibold text-4xl my-4 text-teal-600">
              Order Form
            </h1>
            <div className="mb-3">
              <label htmlFor="travel_date" className="font-medium block mb-1">
                Select Your Travel Date! (*be sure to choose it first to show up
                your start location!)
              </label>
              <DatePicker
                selected={travelDate}
                onChange={(date) => handleDateSelect(date, setFieldValue)}
                filterDate={(date) =>
                  availableDates.some(
                    (availableDate) =>
                      format(new Date(availableDate), "MM/dd/yyyy") ===
                      format(date, "MM/dd/yyyy") // Compare formatted dates
                  )
                }
                className="text-lg border border-teal-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholderText="Select a travel date"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-3">
                <label htmlFor="country" className="font-medium block mb-1">
                  Country
                </label>
                <Field
                  as="select"
                  name="country" // Ensure this matches your Formik initial values
                  id="country"
                  className="text-lg border border-teal-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required // Added required attribute directly to the Field component
                >
                  <option value="" label="Select one option" />
                  {locationInfo && locationInfo.length > 0 ? ( // Check if locationInfo array is not empty
                    [...new Set(locationInfo.map((item) => item.country))].map(
                      (
                        country,
                        index // Get unique countries
                      ) => (
                        <option
                          key={index} // Use index as the key (consider using a unique identifier if available)
                          value={country} // Use country as the value
                          label={country} // Use country as the label
                        />
                      )
                    )
                  ) : (
                    <option value="" label="No countries available" /> // Fallback option if no countries
                  )}
                </Field>
                <StyledErrorMessage name="country" />{" "}
                {/* Ensure this matches the Field name */}
              </div>

              <div className="mb-3">
                <label htmlFor="city" className="font-medium block mb-1">
                  City
                </label>
                <Field
                  as="select"
                  name="city"
                  id="city"
                  className="text-lg border border-teal-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required // Added required attribute directly to the Field component
                >
                  <option value="" label="Select one option" />
                  {locationInfo && locationInfo.length > 0 ? ( // Check if locationInfo array is not empty
                    locationInfo.map(
                      (locationInfoItem, index) =>
                        // Check if the country matches the selected country
                        locationInfoItem.country === countryData ? ( // Use locationInfoItem directly
                          <option
                            key={index} // Use location_id as the key
                            value={locationInfoItem.location_id} // Use location_id as the value
                            label={`${locationInfoItem.city}, ${locationInfoItem.country}`} // Combine city and country for the label
                          >
                            {`${locationInfoItem.city}, ${locationInfoItem.country}`}{" "}
                            {/* Display combined label */}
                          </option>
                        ) : null // Return null if the country does not match
                    )
                  ) : (
                    <option value="" label="No cities available" /> // Fallback option if no cities
                  )}
                </Field>
                <StyledErrorMessage name="city" />{" "}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-3">
                <label
                  htmlFor="payment_method"
                  className="font-medium block mb-1"
                >
                  Payment Method
                </label>
                <Field
                  as="select"
                  name="payment_method"
                  id="payment_method"
                  className="text-lg border border-teal-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  <option value="" label="Select one option" required />
                  {payment.map((paymentMethod) => (
                    <option
                      key={paymentMethod.payment_id}
                      value={paymentMethod.payment_id}
                      label={paymentMethod.payment_name}
                    />
                  ))}
                </Field>
                <StyledErrorMessage name="payment_method" />
              </div>
              <div>
                {travelDateSelected && (
                  <div>
                    {availability !== null ? (
                      <p>Only {availability} people available</p>
                    ) : (
                      <p>Not available</p>
                    )}
                  </div>
                )}
                <div className="mb-3">
                  <label
                    htmlFor="number_of_people"
                    className="font-medium block mb-1"
                  >
                    Number Of People
                  </label>
                  <Field
                    type="number"
                    name="number_of_people"
                    id="number_of_people"
                    className="text-lg border border-teal-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                  <StyledErrorMessage name="number_of_people" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-3">
                <label htmlFor="add_on" className="font-medium block mb-1">
                  Add on
                </label>
                <Field
                  as="select"
                  name="add_on"
                  id="add_on"
                  className="text-lg border border-teal-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  <option value="" label="Select one option" required />
                  {addOn.map((add_on) => (
                    <option
                      key={add_on.add_on_id}
                      value={add_on.add_on}
                      label={add_on.add_on}
                    />
                  ))}
                </Field>
                <StyledErrorMessage name="add_on" />
              </div>
              <div className="mb-3">
                <label htmlFor="discount" className="font-medium block mb-1">
                  Discount
                </label>
                <Field
                  as="select"
                  name="discount"
                  id="discount"
                  className="text-lg border border-teal-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  <option value="" label="Select one option" required />
                  {discount.map((discountData) => (
                    <option
                      key={discountData.discount_id}
                      value={discountData.discount_name}
                      label={discountData.discount_name}
                    />
                  ))}
                </Field>
                <StyledErrorMessage name="discount" />
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <h2 className="text-2xl font-semibold">Total Price</h2>
              {discountedPrice && selectedDiscountPercentage !== 0 ? (
                <div>
                  <p className="text-lg font-medium">$ {totalPrice}</p>
                  <p className="text-red-600 font-medium text-lg">
                    <del>${discountedPrice}</del>
                  </p>
                </div>
              ) : selectedDiscountPercentage === 0 ? (
                <p className="font-medium text-lg">${totalPrice}</p>
              ) : (
                <p className="font-medium text-lg">${totalPrice}</p>
              )}
            </div>
            <button
              className="text-white bg-orange-400 py-4 font-medium w-full text-center mt-4 rounded-lg hover:bg-sky-700 transition duration-200"
              type="submit"
            >
              Order
            </button>
          </Form>
        )}
      </Formik>
      {/* {redirect && <Navigate to={`/recipts/${bookingId}`} />} */}
    </>
  );
};

export default Booking;
