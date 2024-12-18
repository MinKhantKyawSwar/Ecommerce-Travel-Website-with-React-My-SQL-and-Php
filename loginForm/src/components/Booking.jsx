import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify"; // Ensure toast is imported
import * as Yup from "yup";
import StyledErrorMessage from "./StyledErrorMessage";

const Booking = () => {
  const [redirect, setRedirect] = useState(false);
  const [payment, setPayment] = useState([]);
  const [region, setRegion] = useState([]);
  const [addOn, setAddOn] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [discountAdded, setDiscountAdded] = useState(false);
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
    user_id: "",
    package: Number(id),
    booking_date: "",
    travel_date: "",
    city: "",
    country: "",
    region: "",
    payment_method: "",
    number_of_people: 1,
    add_on: "",
    discount: "",
    total_price: 0,
  };

  const AuthFormSchema = Yup.object({
    city: Yup.string().required("City is required."),
    country: Yup.string().required("Country is required."),
    number_of_people: Yup.number()
      .min(1, "You must at book for at least 1 person.")
      .max(15, "Select Possible amount of people")
      .required("Number of People is required"),
    region: Yup.string().required("Region is required."),
    payment_method: Yup.string().required("Payment method is required."),
    travel_date: Yup.date()
      .required("Travel date is required.")
      .min(new Date(), "Travel date must be today or in the future."),
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
      let basePrice = currentPackage.price || 0;
      let regionalPrice = basePrice;
      let addOnPrice = 0;
      let discountedPercentage = 0;

      // Update selected region
      if (name === "region" && value) {
        const selectedRegionData = region.find((r) => r.region_id == value);
        if (selectedRegionData) {
          regionalPrice =
            selectedRegionData.region_name == currentPackage.region
              ? currentPackage.price
              : currentPackage.other_region_price;
          setSelectedRegionPrice(regionalPrice);
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
        // You can perform any additional logic or calculations based on the travel date here
        setTravelDate(selectedTravelDate); // Assuming you have a state setter for travel date
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
        (selectedRegionPrice + selectedAddOnPrice) * totalPeople
      );
      priceAfterDiscountCalculation = Math.round(
        totalPriceCalculation * (selectedDiscountPercentage / 100)
      );

      setTotalPrice(totalPriceCalculation - priceAfterDiscountCalculation);
      setDiscountedPrice(totalPriceCalculation);
    } else {
      totalPriceCalculation = Math.round(
        (selectedRegionPrice + selectedAddOnPrice) * totalPeople
      );
      setTotalPrice(totalPriceCalculation);
    }
  };

  const submitHandler = async (values) => {
    const {
      city,
      country,
      region,
      payment_method,
      number_of_people,
      add_on,
      discount,
      travel_date,
    } = values;

    const data = {
      user_id: localStorage.getItem("user_id"),
      package: Number(id),
      booking_date: new Date(),
      travel_date,
      city,
      country,
      region,
      payment_method,
      number_of_people,
      add_on: addOnId,
      discount: discountId,
      total_price: totalPrice,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/backend/getBooking.php",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === 0) {
        toast.error(response.data.message);
      } else if (response.data.status === 1) {
        console.log(response.data);
        toast.success(response.data.message);
        setTimeout(() => setRedirect(true), 1500);
      } else if (response.data.status === 6) {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      toast.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    getPaymentInfo();
    getRegionInfo();
    getAddOnInfo();
    getPackageInfo();
    getDiscountInfo();
  }, []);

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
        onSubmit={submitHandler}
      >
        {({ isSubmitting }) => (
          <Form
            className="w-full max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"
            method="POST"
            onChange={getDataChange}
          >
            <h1 className="text-center font-semibold text-4xl my-4 text-teal-600">
              Order Form
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-3">
                <label htmlFor="city" className="font-medium block mb-1">
                  City
                </label>
                <Field
                  type="text"
                  name="city"
                  id="city"
                  className="text-lg border border-teal-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <StyledErrorMessage name="city" />
              </div>
              <div className="mb-3">
                <label htmlFor="travel_date" className="font-medium block mb-1">
                  Travel Date
                </label>
                <Field
                  type="date" // Use type="date" for date input
                  name="travel_date"
                  id="travel_date"
                  className="text-lg border border-teal-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <StyledErrorMessage name="travel_date" />
              </div>
              <div className="mb-3">
                <label htmlFor="country" className="font-medium block mb-1">
                  Country
                </label>
                <Field
                  type="text"
                  name="country"
                  id="country"
                  className="text-lg border border-teal-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <StyledErrorMessage name="country" />
              </div>
              <div className="mb-3">
                <label htmlFor="region" className="font-medium block mb-1">
                  Region
                </label>
                <Field
                  as="select"
                  name="region"
                  id="region"
                  className="text-lg border border-teal-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  <option value="" label="Select one option" required />
                  {region.map((region) => (
                    <option
                      key={region.region_id}
                      value={region.region_id}
                      label={region.region_name}
                    />
                  ))}
                </Field>
                <StyledErrorMessage name="region" />
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
              className="text-white bg-teal-600 py-4 font-medium w-full text-center mt-4 rounded-lg hover:bg-teal-700 transition duration-200"
              type="submit"
            >
              Order
            </button>
          </Form>
        )}
      </Formik>
      {redirect && <Navigate to={"/"} />}
    </>
  );
};

export default Booking;
