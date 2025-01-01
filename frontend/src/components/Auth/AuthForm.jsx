import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StyledErrorMessage from "../../utils/StyledErrorMessage";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../providers/UserContext.jsx";

const AuthForm = ({ isLogin }) => {
  const { updateToken } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const initialValues = {
    username: "",
    email: "",
    role: "user",
    phone: "",
    password: "",
    profile_image: "/pictures/profile/defaultProfile.png",
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
      profile_image: "/pictures/profile/defaultProfile.png",
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
          autoClose: 500,
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
          autoClose: 500,
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
        setTimeout(() => setRedirect(true), 1000);
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
      <div className="max-w-md mx-auto p-6 border-gray-900 border bg-white rounded-lg shadow-md my-20">
        <Formik
          initialValues={initialValues}
          validationSchema={AuthFormSchema}
          onSubmit={submitHandler}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6 max-w-md mx-auto bg-white p-6">
              <h1 className="text-center font-semibold text-3xl mb-6 text-gray-800">
                {isLogin ? "Login" : "Register"}
              </h1>

              {!isLogin && (
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Username
                  </label>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter your username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-gray-200 focus:outline-none"
                  />
                  <StyledErrorMessage name="username" className="text-red-500 text-sm mt-1" />
                </div>
              )}

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-gray-200 focus:outline-none"
                />
                <StyledErrorMessage name="email" className="text-red-500 text-sm mt-1" />
              </div>

              {!isLogin && (
                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone
                  </label>
                  <Field
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-gray-200 focus:outline-none"
                  />
                  <StyledErrorMessage name="phone" className="text-red-500 text-sm mt-1" />
                </div>
              )}

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-gray-200 focus:outline-none"
                />
                <StyledErrorMessage name="password" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`py-3 w-full font-medium text-center rounded-lg text-white ${isSubmitting ? "bg-gray-600 cursor-not-allowed" : "bg-gray-800 hover:bg-gray-700"
                  } transition duration-200`}
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