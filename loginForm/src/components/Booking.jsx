import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify"; // Ensure toast is imported
import * as Yup from "yup";
import StyledErrorMessage from "./StyledErrorMessage";

const Booking = () => {
  const [redirect, setRedirect] = useState(false);
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
    number_of_people: "",
    add_on: "",
    discount: "",
    total_price: 0,
  };

  const AuthFormSchema = Yup.object({
    city: Yup.string().required("City is required."),
    country: Yup.string().required("Country is required."),
    number_of_people: Yup.number()
      .max(15, "Select Possible amount of people")
      .required("Number of People is required"),
    region: Yup.string().required("Region is required."),
    payment_method: Yup.string().required("Payment method is required."),
  });

  const submitHandler = async (values) => {
    const { city, country, region, payment_method, number_of_people, add_on, discount } = values;

    const data = {
      user_id: localStorage.getItem("user_id"),
      package: Number(id),
      booking_date: new Date(),
      city,
      country,
      region,
      payment_method: 1,
      number_of_people,
      add_on: 1,
      discount: 1,
      total_price: 1200,
    };

    try {
      const response = await axios.post("http://localhost:3000/backend/getBooking.php", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data.status);

      if (response.data.status === 0) {
        toast.error(response.data.message);
      } else if (response.data.status === 1) {
        console.log(response.data);
        // Assuming updateToken is defined elsewhere
        // updateToken(response.data.token);
        toast.success(response.data.message);
        setTimeout(() => setRedirect(true), 2000);
      } else if (response.data.status === 6) {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      toast.error("An error occurred. Please try again.");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
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
      <Formik initialValues={initialValues} validationSchema={AuthFormSchema} onSubmit={submitHandler}>
        {({ isSubmitting }) => (
          <Form className="w-2/3 mx-auto" method="POST">
            <h1 className="text-center font-semibold text-4xl my-4 text-teal-600">Order Form</h1>
            <div className="flex justify-between">
              <div className="mb-3">
                <label htmlFor="city" className="font-medium block">City</label>
                <Field type="text" name="city" id="city" className="text-lg border ```javascript
                border-teal-600 py-1 w-full rounded-lg" />
                <StyledErrorMessage name="city" />
              </div>
              <div className="mb-3">
                <label htmlFor="country" className="font-medium block">Country</label>
                <Field type="text" name="country" id="country" className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg" />
                <StyledErrorMessage name="country" />
              </div>
              <div className="mb-3">
                <label htmlFor="region" className="font-medium block">Region</label>
                <Field as="select" name="region" id="region" className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg">
                  <option value="" label="Select one option" required />
                  <option value="option1" label="Option 1" />
                  <option value="option2" label="Option 2" />
                  <option value="option3" label="Option 3" />
                </Field>
                <StyledErrorMessage name="region" />
              </div>
            </div>
            <div className="flex justify-between gap-10">
              <div className="mb-3 w-1/2">
                <label htmlFor="payment_method" className="font-medium block">Payment Method</label>
                <Field as="select" name="payment_method" id="payment_method" className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg">
                  <option value="" label="Select one option" required />
                  <option value="credit_card" label="Credit Card" />
                  <option value="paypal" label="PayPal" />
                  <option value="bank_transfer" label="Bank Transfer" />
                </Field>
                <StyledErrorMessage name="payment_method" />
              </div>
              <div className="mb-3 w-1/2">
                <label htmlFor="number_of_people" className="font-medium block">Number Of People</label>
                <Field type="number" name="number_of_people" id="number_of_people" className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg" />
                <StyledErrorMessage name="number_of_people" />
              </div>
            </div>
            <div className="flex justify-between gap-10">
              <div className="mb-3 w-3/4">
                <label htmlFor="add_on" className="font-medium block">Add on</label>
                <Field as="select" name="add_on" id="add_on" className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg">
                  <option value="" label="Select one option" required />
                  <option value="option1" label="Option 1" />
                  <option value="option2" label="Option 2" />
                  <option value="option3" label="Option 3" />
                </Field>
                <StyledErrorMessage name="add_on" />
              </div>
              <div className="mb-3">
                <label htmlFor="discount" className="font-medium block">Discount</label>
                <Field type="text" name="discount" id="discount" className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg" />
                <StyledErrorMessage name="discount" />
              </div>
            </div>
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold">Total Price</h2>
              <p>{initialValues.total_price}</p>
            </div>
            <button className="text-white bg-teal-600 py-4 font-medium w-full text-center" type="submit">
              Order
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Booking;