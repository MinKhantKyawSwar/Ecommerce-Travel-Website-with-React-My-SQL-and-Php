import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
// import { XMarkIcon } from "@heroicons/react/24/solid";
import StyledErrorMessage from "../../components/StyledErrorMessage";
import { UserContext } from "../../utils/UserContext";

const PackageForm = () => {
  const { destinationId: destination } = useContext(UserContext);
  const [packages, setPackages] = useState([]);
  const [region, setRegion] = useState([]);

  const [previousDestination, setPreviousDestination] = useState([]);
  const [previousPackage, setPreviousPackage] = useState([]);

  const [category, setCategory] = useState([]);
  const [guideInfo, setGuideInfo] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const [imagePreview, setImagePreview] = useState(null); // store image preview for accommodation
  const [flightImagePreview, setFlightImagePreview] = useState(null); // store flight image preview
  const [facilitiesImagePreview, setFacilitiesImagePreview] = useState(null); // store facilities image preview
  const [mealsImagePreview, setMealsImagePreview] = useState(null); // store meals image preview
  const [activitiesImagePreview, setActivitiesImagePreview] = useState(null); // store activities image preview

  const [accommodationImage, setAccommodationImage] = useState(null); // store accommodation images
  const [flightImage, setFlightImage] = useState(null); // store flight images
  const [facilitiesImage, setFacilitiesImage] = useState(null); // store facilities images
  const [mealsImage, setMealsImage] = useState(null); // store accommodation images
  const [activitiesImage, setActivitiesImage] = useState(null); // store accommodation images
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

  //getting previous package info
  const getPrevPackageInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/backend/getPackages.php?id=${id}`,
        {
          headers: {
            "Package-Id": id,
          },
        }
      );
      if (response.data.status === 1) {
        setPreviousPackage(response.data.data[0]);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  //for accommodation image change from form
  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setAccommodationImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL for image
    }
  };

  // deleting accommodation image
  const handleDeleteImage = () => {
    setAccommodationImage(null);
    setImagePreview(null);
  };

  //for flight image change from form
  const handleFlightImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFlightImage(file);
      setFlightImagePreview(URL.createObjectURL(file)); // Create a preview URL for image
    }
  };

  // deleting flight image
  const handleDeleteFlightImage = () => {
    setFlightImage(null);
    setFlightImagePreview(null);
  };

  //for facilities image change from form
  const handleFacilitiesImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFacilitiesImage(file);
      setFacilitiesImagePreview(URL.createObjectURL(file)); // Create a preview URL for image
    }
  };

  // deleting facilities image
  const handleFacilitiesDeleteImage = () => {
    setFacilitiesImage(null);
    setFacilitiesImagePreview(null);
  };

  //for meal image change from form
  const handleMealsImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setMealsImage(file);
      setMealsImagePreview(URL.createObjectURL(file)); // Create a preview URL for image
    }
  };

  // deleting accommodation image
  const handleMealsDeleteImage = () => {
    setMealsImage(null);
    setMealsImagePreview(null);
  };

  //for accommodation image change from form
  const handleActivitiesImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setActivitiesImage(file);
      setActivitiesImagePreview(URL.createObjectURL(file)); // Create a preview URL for image
    }
  };

  // deleting accommodation image
  const handleActivitiesDeleteImage = () => {
    setActivitiesImage(null);
    setActivitiesImagePreview(null);
  };

  // initial values either from database or ""
  const initialValues = {
    package_name: previousPackage.package_name || "",
    description: previousPackage.description || "",
    price: previousPackage.price || "",
    other_region_price: previousPackage.other_region_price || "",
    flight_description: previousPackage.flight_description || "",
    flight_image: previousPackage.flight_image || "",
    facilities: previousPackage.facilities || "",
    facilities_image: previousPackage.facilities_image || "",
    meals: previousPackage.meals || "",
    meals_image: previousPackage.meals_image || "",
    activities: previousPackage.activities || "",
    activities_image: previousPackage.activities_image || "",
    duration: previousPackage.duration || "",
    destination: previousPackage.destination || "",
    guide_id: previousPackage.guide_id || "",
  };

  // auth schema for input validation with Yup
  const AuthFormSchema = Yup.object({
    package_name: Yup.string().required("Packge Name is required."),
    description: Yup.string().required("Description is required."),
    price: Yup.number().required("Price is required."),
    other_region_price: Yup.number().required(
      "Other region price is required."
    ),
    flight_description: Yup.string().required(
      "Flight description is required."
    ),
    facilities: Yup.string().required("facilities is required."),
    meals: Yup.string().required("Meals is required."),
    activities: Yup.string().required("Activities is required."),
    duration: Yup.number().required("Duration is required."),
    guide_id: Yup.number().required("Guide is required."),
  });

  // starts fixing submit handler

  // ============================================
  const submitHandler = async (values) => {
    const {
      package_name,
      description,
      price,
      other_region_price,
      flight_description,
      facilities,
      meals,
      activities,
      duration,
      guide_id,
    } = values; // destructuring data from input form

    // creating url for editing and creating destination
    let url;
    if (isEdit) {
      url = "http://localhost:3000/backend/editPackage.php";
    } else {
      url = "http://localhost:3000/backend/getPackages.php";
    }

    if (!flightImage || !facilitiesImage || !mealsImage || !activitiesImage) {
      toast.error("You must upload an image in required locations.", {
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
      formData.append("package_name", package_name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("other_region_price", other_region_price);
      formData.append("flight_description", flight_description);
      formData.append("flight_image", flightImage);
      formData.append("facilities", facilities);
      formData.append("facilities_image", facilitiesImage);
      formData.append("meals", meals);
      formData.append("meals_image", mealsImage);
      formData.append("activities", activities);
      formData.append("activities_image", activitiesImage);
      formData.append("duration", duration);
      formData.append(
        "destination",
        previousPackage.destination ? previousPackage.destination : destination
      );
      formData.append("guide_id", guide_id);

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
      getPrevPackageInfo();
    } else {
      setIsEdit(false);
    }
  }, [id]);

  useEffect(() => {
    if (previousPackage) {
      const { flight_image, facilities_image, meals_image, activities_image } =
        previousPackage;

      // Set the accommodation image if it exists
      if (flight_image) {
        setFlightImage(`http://localhost:3000/backend/${flight_image}`);
        setFlightImagePreview(`http://localhost:3000/backend/${flight_image}`); // Set the preview as well
      }

      if (facilities_image) {
        console.log(facilities_image);
        setFacilitiesImage(`http://localhost:3000/backend/${facilities_image}`);
        setFacilitiesImagePreview(
          `http://localhost:3000/backend/${facilities_image}`
        ); // Set the preview as well
      }

      if (meals_image) {
        console.log(meals_image);
        setMealsImage(`http://localhost:3000/backend/${meals_image}`);
        setMealsImagePreview(`http://localhost:3000/backend/${meals_image}`); // Set the preview as well
      }

      if (activities_image) {
        console.log(activities_image);
        setActivitiesImage(`http://localhost:3000/backend/${activities_image}`);
        setActivitiesImagePreview(
          `http://localhost:3000/backend/${activities_image}`
        ); // Set the preview as well
      }
    }
  }, [previousPackage]);

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
                Package Form
              </h1>
              <div className="mb-4">
                <label htmlFor="package_name" className="font-medium block">
                  Package Name
                </label>
                <Field
                  type="text"
                  name="package_name"
                  id="package_name"
                  className="text-lg border-2 border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <StyledErrorMessage name="package_name" />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="font-medium block">
                  description
                </label>
                <Field
                  type="text"
                  name="description"
                  id="description"
                  className="text-lg border-2 border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <StyledErrorMessage name="description" />
              </div>

              <div className="mb-4">
                <label htmlFor="price" className="font-medium block">
                  Price
                </label>
                <Field
                  type="number"
                  name="price"
                  id="price"
                  className="text-lg border-2 border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <StyledErrorMessage name="price" />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="other_region_price"
                  className="font-medium block"
                >
                  Other Region Price
                </label>
                <Field
                  type="number"
                  name="other_region_price"
                  id="other_region_price"
                  className="text-lg border-2 border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <StyledErrorMessage name="other_region_price" />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="flight_description"
                  className="font-medium block"
                >
                  Flight description
                </label>
                <Field
                  type="text"
                  name="flight_description"
                  id="flight_description"
                  className="text-lg border-2 border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <StyledErrorMessage name="flight_description" />
              </div>

              <div className="mb-4">
                <input
                  type="file"
                  hidden
                  id="flight_image"
                  name="flight_image"
                  accept="image/*"
                  onChange={handleFlightImageChange}
                />
                <label
                  htmlFor="flight_image"
                  className="inline-flex items-center justify-center px-4 py-2 mt-2 text-white bg-blue-500 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  Upload Flight Image
                </label>
                {flightImagePreview && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    <div className="relative basis-1/4 h-24 overflow-hidden rounded-md border border-gray-300 shadow-md">
                      <img
                        src={flightImagePreview}
                        alt="Flight Image Preview"
                        className="w-full h-full object-cover"
                      />
                      <a
                        className="absolute top-1 right-1 cursor-pointer text-red-400 hover:text-red-600"
                        onClick={handleDeleteFlightImage}
                        aria-label="Delete image"
                      >
                        X
                      </a>
                    </div>
                  </div>
                )}
                {flightImage && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected file: {flightImage.name}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="facilities" className="font-medium block">
                  Facilities
                </label>
                <Field
                  type="text"
                  name="facilities"
                  id="facilities"
                  className="text-lg border-2 border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <StyledErrorMessage name="facilities" />
              </div>

              <div className="mb-4">
                <input
                  type="file"
                  hidden
                  id="facilities_image"
                  name="facilities_image"
                  accept="image/*"
                  onChange={handleFacilitiesImageChange}
                />
                <label
                  htmlFor="facilities_image"
                  className="inline-flex items-center justify-center px-4 py-2 mt-2 text-white bg-blue-500 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  Upload Facilities Image
                </label>
                {facilitiesImagePreview && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    <div className="relative basis-1/4 h-24 overflow-hidden rounded-md border border-gray-300 shadow-md">
                      <img
                        src={facilitiesImagePreview}
                        alt="Facilities Image Preview"
                        className="w-full h-full object-cover"
                      />
                      <a
                        className="absolute top-1 right-1 cursor-pointer text-red-400 hover:text-red-600"
                        onClick={handleFacilitiesDeleteImage}
                        aria-label="Delete image"
                      >
                        X
                      </a>
                    </div>
                  </div>
                )}
                {facilitiesImage && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected file: {facilitiesImage.name}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="meals" className="font-medium block">
                  Meals
                </label>
                <Field
                  type="text"
                  name="meals"
                  id="meals"
                  className="text-lg border-2 border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <StyledErrorMessage name="meals" />
              </div>

              <div className="mb-4">
                <input
                  type="file"
                  hidden
                  id="meals_image"
                  name="meals_image"
                  accept="image/*"
                  onChange={handleMealsImageChange}
                />
                <label
                  htmlFor="meals_image"
                  className="inline-flex items-center justify-center px-4 py-2 mt-2 text-white bg-blue-500 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  Upload Meals Image
                </label>
                {mealsImagePreview && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    <div className="relative basis-1/4 h-24 overflow-hidden rounded-md border border-gray-300 shadow-md">
                      <img
                        src={mealsImagePreview}
                        alt="Meals Image Preview"
                        className="w-full h-full object-cover"
                      />
                      <a
                        className="absolute top-1 right-1 cursor-pointer text-red-400 hover:text-red-600"
                        onClick={handleMealsDeleteImage}
                        aria-label="Delete image"
                      >
                        X
                      </a>
                    </div>
                  </div>
                )}
                {mealsImage && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected file: {mealsImage.name}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="activities" className="font-medium block">
                  Activities
                </label>
                <Field
                  type="text"
                  name="activities"
                  id="activities"
                  className="text-lg border-2 border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <StyledErrorMessage name="activities" />
              </div>

              <div className="mb-4">
                <input
                  type="file"
                  hidden
                  id="activities_image"
                  name="activities_image"
                  accept="image/*"
                  onChange={handleActivitiesImageChange}
                />
                <label
                  htmlFor="activities_image"
                  className="inline-flex items-center justify-center px-4 py-2 mt-2 text-white bg-blue-500 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  Upload activities Image
                </label>
                {activitiesImagePreview && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    <div className="relative basis-1/4 h-24 overflow-hidden rounded-md border border-gray-300 shadow-md">
                      <img
                        src={activitiesImagePreview}
                        alt="activities Image Preview"
                        className="w-full h-full object-cover"
                      />
                      <a
                        className="absolute top-1 right-1 cursor-pointer text-red-400 hover:text-red-600"
                        onClick={handleActivitiesDeleteImage}
                        aria-label="Delete image"
                      >
                        X
                      </a>
                    </div>
                  </div>
                )}

                {activitiesImage && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected file: {activitiesImage.name}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="duration" className="font-medium block">
                  Duration
                </label>
                <Field
                  type="number"
                  name="duration"
                  id="duration"
                  className="text-lg border-2 border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <StyledErrorMessage name="duration" />
              </div>

              <div className="mb-4">
                <label htmlFor="guide_id" className="font-medium block mb-1">
                  Tour Guide
                </label>
                <Field
                  as="select"
                  name="guide_id"
                  id="guide_id"
                  className="text-lg border border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" label="Select one option" required />
                  {guideInfo.map((guide) => (
                    <option
                      key={guide.guide_id}
                      value={guide.guide_id}
                      label={guide.guide_name}
                    />
                  ))}
                </Field>
                <StyledErrorMessage name="guide" />
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

export default PackageForm;
