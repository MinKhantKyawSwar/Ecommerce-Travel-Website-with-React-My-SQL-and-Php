import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StyledErrorMessage from "../../utils/StyledErrorMessage";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../providers/UserContext.jsx";
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";

const AuthForm = ({ isLogin }) => {
  const { updateToken, setIsEmail } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    role: "user",
    phone: "",
    password: "",
    confirmPassword: isLogin ? "" : "",
    profile_image: "/pictures/profile/defaultProfile.png",
    created_at: null,
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPasswordToggle = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
  // min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

  const AuthFormSchema = Yup.object({
    username: isLogin
      ? null
      : Yup.string()
          .min(3, "Username is too short.")
          .max(20, "Username is too long.")
          .required("Username is required."),
    email: Yup.string()
      .required("Email is required.")
      .email("Please enter a valid email."),
    password: Yup.string()
      .min(4, "Password is too short.")
      .matches(passwordRules, {
        message:
          "Password must contains minimum of 5 characters, 1 uppercase, 1 lowercase letter and 1 digit.",
      })
      .required("Password is required."),
    confirmPassword: isLogin
      ? Yup.string().notRequired()
      : Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords do not match.")
          .required("Confirm Password is required."),
  });

  const resetPasswordHandler = async (values) => {
    const { resetEmail } = values;
    setIsEmail(resetEmail);
    const url = "http://localhost:3000/backend/checkUser.php"; // Backend endpoint for resetting passwords
    const data = { email: resetEmail }; // Match the backend payload structure

    try {
      const response = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.status === 1) {
        toast.success("Email Found", {
          position: "top-center",
          autoClose: 2000,
          theme: "light",
        });
        navigate("/reset-password");
      } else {
        toast.error(response.data.message || "Failed to send reset email.", {
          position: "top-center",
          autoClose: 2000,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error during reset password request:", error.message);
      toast.error("An error occurred. Please try again later.", {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
      });
    }
  };

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
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
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
                  <StyledErrorMessage
                    name="username"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
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
                <StyledErrorMessage
                  name="email"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {!isLogin && (
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
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
                  <StyledErrorMessage
                    name="phone"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              )}

              <div>
                <div className=" text-sm font-medium text-gray-700 flex justify-between mb-2">
                  <label htmlFor="password">Password</label>
                  {isLogin && (
                    <>
                      <div className="flex items-center justify-between">
                        <a
                          className="underline cursor-pointer"
                          onClick={() =>
                            document.getElementById("my_modal_3").showModal()
                          }
                        >
                          Forget Password?
                        </a>
                      </div>
                    </>
                  )}
                </div>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Enter your confirm password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-gray-200 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute  right-4 top-5 transform -translate-y-1/2 text-gray-500 text-lg"
                  >
                    {showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
                  </button>
                </div>
                <StyledErrorMessage
                  name="password"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              {!isLogin && (
                <div className="relative">
                  <div className="text-sm font-medium text-gray-700 flex justify-between mb-2">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                  </div>
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Enter your confirm password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-gray-200 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute mt-3 right-4 top-9 transform -translate-y-1/2 text-gray-500 text-lg"
                  >
                    {showConfirmPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
                  </button>
                  <StyledErrorMessage
                    name="confirmPassword"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`py-3 w-full font-medium text-center rounded-lg text-white ${
                  isSubmitting
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gray-800 hover:bg-gray-700"
                } transition duration-200`}
              >
                {isLogin
                  ? `${isSubmitting ? "Submitting..." : "Login"}`
                  : `${isSubmitting ? "Registering..." : "Register"}`}
              </button>
              <div>
                {!isLogin ? (
                  <p>
                    If you already have an account,{" "}
                    <a className="font-semibold underline" href="/login">
                      click here
                    </a>{" "}
                    to register.
                  </p>
                ) : (
                  <p>
                    If you don't have an account,{" "}
                    <a className="font-semibold underline" href="/register">
                      click here
                    </a>{" "}
                    to login.
                  </p>
                )}
              </div>
            </Form>
          )}
        </Formik>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>

              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4 text-gray-700">
                Press ESC key or click on ✕ button to close
              </p>
            </form>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const resetEmail = e.target.resetEmail.value;
                resetPasswordHandler({ resetEmail });
              }}
            >
              <label className="input input-bordered flex items-center gap-2 mb-4">
                Email
                <input
                  type="email"
                  className="grow"
                  name="resetEmail"
                  placeholder="Enter your email"
                  required
                />
              </label>
              <button
                type="submit"
                className="px-2 py-4 rounded-lg bg-gray-800 text-white w-full"
              >
                Send Reset Link
              </button>
            </form>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default AuthForm;
