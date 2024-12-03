import React, { useContext, useState } from 'react'
import { UserContext } from '../utils/UserContext';
import { Slide, ToastContainer } from 'react-toastify';
import { Field, Formik } from 'formik';
import * as Yup from "yup";
import axios from "axios";
import isLogin from '../utils/isLogin';
import { Form } from 'react-router-dom';
import StyledErrorMessage from './StyledErrorMessage';

const ManageProfile = () => {
  const { token, updateToken, userInfo, setUserInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const initialValues = {
    username: userInfo.username,
    email: userInfo.email,
    role: userInfo.role,
    phone: userInfo.phone,
    password: userInfo.password,
    country: userInfo.country,
    city: userInfo.city,
    Tour_Package: userInfo.Tour_Package,
    profile_image : userInfo.profile_image,
    Created_At: userInfo.Created_At,
  };

  const AuthFormSchema = Yup.object({
    username: isLogin
      ? null
      : Yup.string()
          .min(3, "Username is too short.")
          .max(10, "Username is too long.")
          .required("Username is required."),
    email: Yup.string()
      .required("Email is required.")
      .email("Please enter a valid email."),
    phone: Yup.number()
      .required("Phone is required.")
      .integer(),
    prev_password: Yup.string()
      .required("Password is required.").when('password', (password, schema) => {
        return schema.test({
            test: prev_password => prev_password === initialValues.password,
            message: 'Passwords must be equal'
        });
    }),
    city: Yup.string()
      .required("City is required.")
      .min(3, "City is too short."),
    country: Yup.string()
    .required("Country is required.")
    .min(3, "Country is too short."),
  });
  

  const submitHandler = async (values) => {
    const { email, prev_password, username, phone, country, city, profile_image } = values;
    let url = "http://localhost:3000/backend/editProfile.php";

    const data = {
      username,
      email,
      role,
      phone,
      password,
      country,
      city,
      Tour_Package,
      profile_image,
      Created_At,
    };
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(data);

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
      

      if (response.data.status === 0) {
        toastError(response.data.message);
      } else if (response.data.status === 1) {
        // console.log(response.data.username);
        updateToken(response.data.token);
        toastFire(response.data.message);
        setTimeout(() => setRedirect(true), 2000);
      } else if (response.data.status == 6) {
        toastError(response.data.message);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };
  if (redirect) {
    return <Navigate to={isLogin ? "/" : "/login"} />;
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
      onSubmit={submitHandler}
      enableReinitialize={true}
    >
      {({ isSubmitting }) => (
        <Form className="w-1/2 mx-auto" method="POST">
          <h1 className="text-center font-semibold text-4xl my-4 text-teal-600">
            {/* {isLogin ? "Login" : "Register"} */}
            Manage Profile
          </h1>
          {isLogin && (
            <div className="mb-3">
              <label htmlFor="username" className="font-medium block">
                Username
              </label>
              <Field
                type="text"
                name="username"
                id="username"
                values={initialValues.username}
                className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
              />
              <StyledErrorMessage name="username" />
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="email" className="font-medium block">
              Email
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              values ={initialValues.email}
              className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
            />
            <StyledErrorMessage name="email" />
          </div>
              <div className="mb-3">
                <label htmlFor="phone" className="font-medium block">
                Phone
              </label>
                <Field
                  type="phone"
                  name="phone"
                  id="phone"
                  values ={initialValues.phone=== 0 ? "":initialValues.phone}
                  className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
                />
                <StyledErrorMessage name="phone" />
              </div>
              <div className="mb-3">
                <label htmlFor="country" className="font-medium block" >
                Country
              </label>
                <Field
                  type="text"
                  name="country"
                  id="country"
                  values ={initialValues.country}
                  className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
                />
                <StyledErrorMessage name="country" />
              </div>
              <div className="mb-3">
                <label htmlFor="city" className="font-medium block">
                City
              </label>
                <Field
                  type="text"
                  name="city"
                  id="city"
                  className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
                  values={userInfo.city }
                />
                <StyledErrorMessage name="city" />
              </div>
              <div className="mb-3">
                <label htmlFor="city" className="font-medium block">
                Country
              </label>
                <Field
                  type="text"
                  name="profile_image"
                  id="profile_image"
                  values={userInfo.country}
                  className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
                />
                <StyledErrorMessage name="profile_image" />
              </div>

          {/* <div className="mb-3">
            <label htmlFor="prev-password" className="font-medium block">
              Previous Password
            </label>
            <Field
              type="password"
              name="prev-password"
              id="prev-password"
              className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
            />
            <StyledErrorMessage name="prev-password" />
          </div>
          <div className="mb-3">
            <label htmlFor="new_password" className="font-medium block">
              New password
            </label>
            <Field
              type="password"
              name="new-password"
              id="new_password"
              className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
            />
            <StyledErrorMessage name="new_password" />
          </div> */}
          {/* <label
          htmlFor="upload"
          className="p-2 rounded-md border-dashed border-2 border-blue-600font-medium my-3 text-blue-600 cursor-pointer"
        >
          Upload from device
        </label>
        <input
          type="file"
          hidden
          id="upload"
          name="profile_image"
          multiple
          accept="image/png, image/jpeg, image/jpg"
          onChange={() => onChangeHandler(event)}
        /> */}
          <button
            className="text-white bg-teal-600 py-4 font-medium w-full text-center"
            type="submit"
            disabled={isSubmitting}
          >
            Update
          </button>
        </Form>
      )}
    </Formik>
  </>
  )
}

export default ManageProfile