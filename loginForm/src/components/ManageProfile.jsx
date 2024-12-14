import React, { useContext, useState } from "react";
import { UserContext } from "../utils/UserContext";
import { Slide, ToastContainer } from "react-toastify";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import isLogin from "../utils/isLogin";
import { Form } from "react-router-dom";
import StyledErrorMessage from "./StyledErrorMessage";

const ManageProfile = () => {
  const { token, updateToken, userInfo, setUserInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const initialValues = {
    username: userInfo.username,
    email: userInfo.email,
    role: userInfo.role,
    phone: userInfo.phone,
    password: userInfo.password,
    profile_image: "",
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
    phone: Yup.number().required("Phone is required.").integer(),
    prev_password: Yup.string()
      .required("Password is required.")
      .when("password", (password, schema) => {
        return schema.test({
          test: (prev_password) => prev_password === initialValues.password,
          message: "Passwords must be equal",
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
    const { email, username, phone, password, profile_image } = values;
    let url = "http://localhost:3000/backend/editProfile.php";

    const data = {
      username,
      email,
      phone,
      password,
      profile_image,
    };

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("username", username);
      formData.append("phone", phone);
      if (profile_image) formData.append("profile_image", profile_image); // Append profile image if it's changed
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("here");

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
        console.log(response.data.username);
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
          <Form
            className="w-1/2 mx-auto"
            method="post"
            encType="multipart/form-data"
          >
            <h1 className="text-center font-semibold text-4xl my-4 text-teal-600">
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
                values={initialValues.email}
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
                values={initialValues.phone === 0 ? "" : initialValues.phone}
                className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
              />
              <StyledErrorMessage name="phone" />
            </div>

            {/* Profile Image Upload */}
            <div className="mb-3">
              <label htmlFor="profile_image" className="font-medium block">
                Profile Image
              </label>
              <input
                type="file"
                id="profile_image"
                name="profile_image"
                className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
                accept="image/*"
                onChange={(event) =>
                  setFieldValue("profile_image", event.currentTarget.files[0])
                }
              />
            </div>
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
  );
};

export default ManageProfile;
