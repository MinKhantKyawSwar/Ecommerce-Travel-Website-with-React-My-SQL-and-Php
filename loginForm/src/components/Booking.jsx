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
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentPackage, setCurrentPackage] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams(); // package id from url

  

  const initialValues = {
    user_id: "",
    package: Number(id),
    booking_date: "",
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
    number_of_people: Yup.number().min(1,"You must at book for at least 1 person.")
      .max(15, "Select Possible amount of people")
      .required("Number of People is required"),
    region: Yup.string().required("Region is required."),
    payment_method: Yup.string().required("Payment method is required."),
  });

  const getRegionInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getBooking.php",
        {
          headers: {
            "Region": "",
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
            "Payment": "",
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
            "Add_on": "",
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
        setCurrentPackage(response.data.data[0])

      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };
  
  // const calculateTotalPrice = (e) => {
  //   let allCharges = 0;
  //   let regionalPrice = 0;
  //   let addOnPrice = 0;
  //   let totalPeople = 1;
    
  //   const { name } = e.target;
  //   if(name === "region"){
  //     region.map((region, index)=>{
  //       if(region.region_id==e.target.value){
  //         if(region.region_name == currentPackage.region){
  //           regionalPrice =  currentPackage.price;
  //         } 
  //         else{
  //           regionalPrice = currentPackage.other_region_price;
  //         } 
  //       }
  //     })
  //   }
  //   if(name === "add_on"){
  //     addOn.map((add_on, index)=>{
  //       // console.log(add_on.add_on===e.target.value)
  //       if(add_on.add_on===e.target.value){
  //         addOnPrice  = add_on.price;
  //       }
  //     })
     
  //   } 
  //   if(name === "number_of_people"){
  //     totalPeople = e.target.value;
  //   } 
  //   setTotalPrice(regionalPrice);
  //   allCharges = (totalPrice + addOnPrice) * totalPeople;
  //   setTotalPrice(allCharges)
  // };


  const calculateTotalPrice = (e) => {
    try {
      const { name, value } = e.target;
      let basePrice = currentPackage.price || 0;
      let regionalPrice = basePrice;
      let addOnPrice = 0;
      let totalPeople = 1;
  
      // Regional Price Calculation
      if (name === "region" && value) {
        const selectedRegion = region.find(r => r.region_id == value);
        if (selectedRegion) {
          regionalPrice = (selectedRegion.region_name === currentPackage.region) 
            ? currentPackage.price 
            : (currentPackage.other_region_price);
        }
      }
  
      // Add-on Price Calculation
      if (name === "add_on" && value) {
        const selectedAddOn = addOn.find(add => add.add_on === value);
        if (selectedAddOn) {
          addOnPrice = selectedAddOn.price;
        }
      }
  
      // Number of People Calculation
      if (name === "number_of_people") {
        totalPeople = Math.max(1, parseInt(value) || 1);
      }
  
      // Total Price Calculation
      let calculatedTotalPrice = Math.round((regionalPrice + addOnPrice) * totalPeople);
      setTotalPrice(calculatedTotalPrice);
  
    } catch (error) {
      console.error("Price calculation error:", error);
      // Fallback to base price
      setTotalPrice(currentPackage.price || 0);
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
    } = values;
    
    const data = {
      user_id: localStorage.getItem("user_id"),
      package: Number(id),
      booking_date: new Date(),
      city,
      country,
      region,
      payment_method,
      number_of_people,
      add_on,
      discount,
      total_price,
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
        setTimeout(() => setRedirect(true), 2000);
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

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  useEffect(() => {
    getPaymentInfo();
    getRegionInfo();
    getAddOnInfo();
    getPackageInfo();
  }, []);

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
          <Form className="w-2/3 mx-auto" method="POST" onChange={ calculateTotalPrice}>
            <h1 className="text-center font-semibold text-4xl my-4 text-teal-600">
              Order Form
            </h1>
            <div className="flex justify-between">
              <div className="mb-3">
                <label htmlFor="city" className="font-medium block">
                  City
                </label>
                <Field
                  type="text"
                  name="city"
                  id="city"
                  className="text-lg border border-teal-600 py-1 w-full rounded-lg"
                />
                <StyledErrorMessage name="city" />
              </div>
              <div className="mb-3">
                <label htmlFor="country" className="font-medium block">
                  Country
                </label>
                <Field
                  type="text"
                  name="country"
                  id="country"
                  className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
                />
                <StyledErrorMessage name="country" />
              </div>
              <div className="mb-3">
                <label htmlFor="region" className="font-medium block">
                  Region
                </label>
                <Field
                  as="select"
                  name="region"
                  id="region"
                  className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
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
            <div className="flex justify-between gap-10">
              <div className="mb-3 w-1/2">
                <label htmlFor="payment_method" className="font-medium block">
                  Payment Method
                </label>
                <Field
                  as="select"
                  name="payment_method"
                  id="payment_method"
                  className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
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
              <div className="mb-3 w-1/2">
                <label htmlFor="number_of_people" className="font-medium block">
                  Number Of People
                </label>
                <Field
                  type="number"
                  name="number_of_people"
                  id="number_of_people"
                  className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
                />
                <StyledErrorMessage name="number_of_people" />
              </div>
            </div>
            <div className="flex justify-between gap-10">
              <div className="mb-3 w-3/4">
                <label htmlFor="add_on" className="font-medium block">
                  Add on
                </label>
                <Field
                  as="select"
                  name="add_on"
                  id="add_on"
                  className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
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
                <label htmlFor="discount" className="font-medium block">
                  Discount
                </label>
                <Field
                  type="text"
                  name="discount"
                  id="discount"
                  className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
                />
                <StyledErrorMessage name="discount" />
              </div>
            </div>
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold">Total Price</h2>
              <p>{totalPrice}</p>
            </div>
            <button
              className="text-white bg-teal-600 py-4 font-medium w-full text-center"
              type="submit"
            >
              Order
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Booking;
