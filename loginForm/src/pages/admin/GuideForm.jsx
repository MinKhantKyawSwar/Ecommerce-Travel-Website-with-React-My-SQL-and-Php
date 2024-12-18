import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
// import { XMarkIcon } from "@heroicons/react/24/solid";
import StyledErrorMessage from "../../components/StyledErrorMessage";

const GuideForm = () => {
  const [previousGuide, setPreviousGuideInfo] = useState([]);
  const [guideInfo, setGuideInfo] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const [guideImagePreview, setGuideImagePreview] = useState(null); // store guide image preview

  const [guideImage, setGuideImage] = useState(null); // store guide images
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  // getting category info
  const getGuideInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getGuideInfo.php",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === 0) {
        console.log(response.data.message);
      } else if (response.data.status === 1) {
        setGuideInfo(response.data.data);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  //getting previous Guide info
  const getPrevGuideInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/backend/getGuideInfo.php?id=${id}`,
        {
          headers: {
            "Guide-Id": id,
          },
        }
      );

      if (response.data.status === 1) {
        setPreviousGuideInfo(response.data.data[0]);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  //for profile image change from form
  const handleProfileImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setGuideImage(file);
      setGuideImagePreview(URL.createObjectURL(file)); // Create a preview URL for image
    }
  };

  // deleting profile image
  const handleDeleteProfileImage = () => {
    setGuideImage(null);
    setGuideImagePreview(null);
  };

  // initial values either from database or ""
  const initialValues = {
    guide_name: previousGuide.guide_name || "",
    email: previousGuide.email || "",
    description: previousGuide.description || "",
    language: previousGuide.language || "",
    exp_years: previousGuide.exp_years || "",
    guide_image: previousGuide.guide_image || "",
  };

  // auth schema for input validation with Yup
  const AuthFormSchema = Yup.object({
    guide_name: Yup.string().required("Guide Name is required."),
    email: Yup.string()
      .required("Email is required.")
      .email("Please enter a valid email."),
    description: Yup.string().required("Description is required."),
    language: Yup.string().required("Language is required."),
    exp_years: Yup.number().required("Experience Year is required."), // Change exp_year to exp_years
  });

  const submitHandler = async (values) => {
    const {
      guide_name,
      email,
      description,
      language,
      exp_years,
    } = values; // destructuring data from input form

    // creating url for editing and creating destination
    let url;
    if (isEdit) {
      url = "http://localhost:3000/backend/editGuide.php";
    } else {
      url = "http://localhost:3000/backend/getGuideInfo.php";
    }

    if (!guideImage) {
      toast.error("You must upload guide image in required locations.", {
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
      return; // Exit the function if validation fails
    }

    try {
      // formdata to send to backend
      const formData = new FormData();
      if (isEdit) {
        formData.append("id", id);
      }
      formData.append("guide_name", guide_name);
      formData.append("email", email);
      formData.append("description", description);
      formData.append("language", language);
      formData.append("exp_years", exp_years);
      formData.append("guide_image", guideImage);

      // Send the form data to the backend
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle response status
      if (response.data.status === 0) {
        toast.error(response.data.message, {
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
      } else if (response.data.status === 1) {
        toast.success(response.data.message, {
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
        setRedirect(true); // Redirect after successful submission
      } else if (response.data.status === 6) {
        toast.error(response.data.message, {
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
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const goBackHandler = () => {
    navigate(-1);
  };

  useEffect(() => {
    getGuideInfo();
  }, []);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      getPrevGuideInfo();
    } else {
      setIsEdit(false);
    }
  }, [id]);

  useEffect(() => {
    if (previousGuide) {
      const { guide_image } =
        previousGuide;

      // Set the accommodation image if it exists
      if (guide_image) {
        setGuideImage(`http://localhost:3000/backend/${guide_image}`);
        setGuideImagePreview(`http://localhost:3000/backend/${guide_image}`); // Set the preview as well
      }
    }
  }, [previousGuide]);

  if (redirect) {
    return <Navigate to={`/admin`} />;
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
        <button
          className="text-blue-600 font-medium py-2 px-10 mt-4 rounded-lg border border-blue-600 hover:bg-blue-600 hover:text-white transition duration-200"
          onClick={goBackHandler}
        >
          Go Back
        </button>
        <Formik
          initialValues={initialValues}
          validationSchema={AuthFormSchema}
          enableReinitialize={true} // This allows the form to reinitialize when initialValues change
          onSubmit={submitHandler}
        >
          {({ isSubmitting }) => (
            <Form
              className="space-y-6" // Increased spacing
              method="post"
              encType="multipart/form-data"
            >
              <h1 className="text-center font-semibold text-3xl my-4 text-blue-600">
                Guide Form
              </h1>

              <div className="mb-4">
                <input
                  type="file"
                  hidden
                  id="guide_image"
                  name="guide_image"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                />
                <label
                  htmlFor="guide_image"
                  className="inline-flex items-center justify-center px-4 py-2 mt-2 text-white bg-blue-500 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  Upload Guide Image
                </label>
                {guideImagePreview && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    <div className="relative basis-1/4 h-24 overflow-hidden rounded-md border border-gray-300 shadow-md">
                      <img
                        src={guideImagePreview}
                        alt="Guide Image Preview"
                        className="w-full h-full object-cover"
                      />
                      <a
                        className="absolute top-1 right-1 cursor-pointer text-red-400 hover:text-red-600"
                        onClick={handleDeleteProfileImage}
                        aria-label="Delete image"
                      >
                        X
                      </a>
                    </div>
                  </div>
                )}
                {guideImage && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected file: {guideImage.name}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="guide_name" className="font-medium block">
                  Guide Name
                </label>
                <Field
                  type="text"
                  name="guide_name"
                  id="guide_name"
                  className="text-lg border-2 border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <StyledErrorMessage name="guide_name" />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="font-medium block">
                  Email
                </label>
                <Field
                  type="text"
                  name="email"
                  id="email"
                  className="text-lg border-2 border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <StyledErrorMessage name="email" />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="font-medium block">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  id="description"
                  className="text-lg border-2 border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                  rows="8"
                />
                <StyledErrorMessage name="description" />
              </div>

              <div className="mb-4">
                <label htmlFor="language" className="font-medium block">
                  language
                </label>
                <Field
                  type="text"
                  name="language"
                  id="language"
                  className="text-lg border-2 border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <StyledErrorMessage name="language" />
              </div>

              <div className="mb-4">
                <label htmlFor="exp_years" className="font-medium block">
                  Experience Years
                </label>
                <Field
                  type="number"
                  name="exp_years"
                  id="exp_years"
                  className="text-lg border-2 border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <StyledErrorMessage name="exp_years" />
              </div>

              <button
                className="text-white bg-blue-600 py-3 font-medium w-full text-center rounded-lg hover:bg-teal-700 transition duration-200"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default GuideForm;
