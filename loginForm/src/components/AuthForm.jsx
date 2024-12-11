import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StyledErrorMessage from "./StyledErrorMessage";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../utils/UserContext";

const AuthForm = ({ isLogin }) => {
  const { updateToken } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const initialValues = {
    username: "",
    email: "",
    role: "user",
    phone: "",
    password: "",
    profile_image: "",
    created_at: null,
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
    password: Yup.string()
      .min(4, "Password is too short.")
      .required("Password is required."),
  });

  const submitHandler = async (values) => {
    const { email, password, username, phone } = values;
    let url = "http://localhost:3000/backend/register.php";

    if (isLogin) {
      url = "http://localhost:3000/backend/login.php";
    }

    const data = {
      username,
      email,
      role: "customer",
      phone,
      password,
      profile_image: "",
      created_at: new Date().toLocaleString(),
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

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
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <Formik
          initialValues={initialValues}
          validationSchema={AuthFormSchema}
          onSubmit={submitHandler}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <h1 className="text-center font-semibold text-3xl my-4 text-blue-600">
                {isLogin ? "Login" : "Register"}
              </h1>
              {!isLogin && (
                <div className="mb-3">
                  <label htmlFor="username" className="font-medium block">
                    Username
                  </label>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    className="text-lg border-2 border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
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
                  className="text-lg border-2 border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <StyledErrorMessage name="email" />
              </div>
              {!isLogin && (
                <div className="mb-3">
                  <label htmlFor="phone" className="font-medium block">
                    Phone
                  </label>
                  <Field
                    type="tel"
                    name="phone"
                    id="phone"
                    className="text-lg border-2 border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                  <StyledErrorMessage name="phone" />
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="password" className="font-medium block">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="text-lg border-2 border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <StyledErrorMessage name="password" />
              </div>
              <button
                className="text-white bg-blue-600 py-3 font-medium w-full text-center rounded-lg hover:bg-teal-700 transition duration-200"
                type="submit"
                disabled={isSubmitting}
              >
                {isLogin
                  ? `${isSubmitting ? "Submitting..." : "Login"}`
                  : `${isSubmitting ? "Registering..." : "Register"}`}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AuthForm;