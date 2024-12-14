import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// import { XMarkIcon } from "@heroicons/react/24/solid";
import StyledErrorMessage from "../../components/StyledErrorMessage";

const DestinationForm = () => {
  const [region, setRegion] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState("");
  const [category, setCategory] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);
  const [savedImages, setSavedImages] = useState([]);
  const [selectedImagesCount, setSelectedImagesCount] = useState(0);
  const [accommodationImage, setAccommodationImage] = useState(null);

  const navigate = useNavigate();

  const getAllRegion = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getBooking.php",
        {
          headers: {
            Region: region,
          },
        }
      );
      if (response.data.status === 0) {
        console.log(response.data.message);
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

  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getCategory.php",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === 0) {
        console.log(response.data.message);
      } else if (response.data.status === 1) {
        setCategory(response.data.data);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  //for accommodation
  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setAccommodationImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  const handleDeleteImage = () => {
    setAccommodationImage(null);
    setImagePreview(null);
  };

  // for destination images
  const onChangeHandler = (event) => {
    const selectedImages = event.target.files;
    const selectedImagesArray = Array.from(selectedImages);

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

    if (images.length + selectedImagesArray.length > 3) {
      toastError("You can only upload a maximum of 3 images.");
      return; // Exit the function if the limit is exceeded
    }

    // Update selected images count
    setSelectedImagesCount((prev) => prev + selectedImagesArray.length);
    setImages((prev) => [...prev, ...selectedImagesArray]);

    const previewImagesArray = selectedImagesArray.map((img) => {
      return URL.createObjectURL(img);
    });
    setPreviewImages((prev) => prev.concat(previewImagesArray));
  };

  const deleteHandler = (img) => {
    const indexToDelete = previewImages.findIndex((e) => e === img);

    // Update selected images count
    setSelectedImagesCount((prev) => prev - 1);

    if (indexToDelete !== -1) {
      const updatedSelectedImages = [...images];
      updatedSelectedImages.splice(indexToDelete, 1);

      setImages(updatedSelectedImages);
      setPreviewImages((prevImg) => prevImg.filter((e) => e !== img));

      URL.revokeObjectURL(img);
    }
  };

  const initialValues = {
    destination_name: "",
    country: "",
    region: "",
    description: "",
    category: "",
    accommodation: "",
    destination_image: "",
    destination_second_image: "",
    destination_third_image: "",
    accommodation_image: "",
  };

  const AuthFormSchema = Yup.object({
    destination_name: Yup.string().required("Destination Name is required."),
    country: Yup.string().required("Country is required."),
    region: Yup.string().required("Region is required."),
    description: Yup.string().required("Description is required."),
    category: Yup.string().required("Type is required."),
    accommodation: Yup.string().required("Type is required."),
  });

  const submitHandler = async (values) => {
    const {
      destination_name,
      country,
      region,
      description,
      category,
      accommodation,
      destination_image,
      destination_second_image,
      destination_third_image,
      accommodation_image,
    } = values;

    let url = "http://localhost:3000/backend/getDestination.php";

    try {
      const formData = new FormData();
      formData.append("destination_name", destination_name);
      formData.append("country", country);
      formData.append("region", region);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("accommodation", accommodation);
      console.log(images[0]);
      if (images[0]) {
        formData.append("destination_image", images[0]);
      }
      if (images[1]) {
        formData.append("destination_second_image", images[1]);
      }
      if (images[2]) {
        formData.append("destination_third_image", images[2]);
      }
      if (accommodationImage) {
        formData.append("accommodation_image", accommodationImage);
      }

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
        toastFire(response.data.message);
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

  const goBackHandler = () => {
    localStorage.removeItem("activeTab");
    navigate(-1);
  };

  if (redirect) {
    return <Navigate to={`/admin`} />;
  }

  useEffect(() => {
    getAllCategories();
    getAllRegion();
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
          onSubmit={submitHandler}
        >
          {({ isSubmitting }) => (
            <Form
              className="space-y-6" // Increased spacing
              method="post"
              encType="multipart/form-data"
            >
              <h1 className="text-center font-semibold text-3xl my-4 text-blue-600">
                Destination Form
              </h1>
              <div className="mb-4">
                <label htmlFor="destination_name" className="font-medium block">
                  Destination Name
                </label>
                <Field
                  type="text"
                  name="destination_name"
                  id="destination_name"
                  className="text-lg border-2 border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <StyledErrorMessage name="destination_name" />
              </div>

              <input
                type="file"
                hidden
                id="upload"
                name="product_images"
                multiple
                accept="image/png, image/jpeg, image/jpg"
                onChange={onChangeHandler}
              />
              <label
                htmlFor="upload"
                className="inline-flex items-center justify-center px-4 py-2 mt-2 text-white bg-blue-500 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                Upload Destination Images
                {3 - selectedImagesCount === 0
                  ? ""
                  : ` (* add ${3 - selectedImagesCount} more images *)`}
              </label>
              <div className="flex flex-wrap gap-2 mt-4">
                {previewImages.map((img, index) => (
                  <div
                    key={index}
                    className="relative basis-1/4 h-24 overflow-hidden rounded-md border border-gray-300 shadow-md"
                  >
                    <img
                      src={img}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover"
                    />
                    <a
                      className="absolute top-1 right-1 cursor-pointer text-red-400 hover:text-red-600"
                      onClick={() => deleteHandler(img)}
                      aria-label="Delete image"
                    >
                      X
                    </a>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <label htmlFor="country" className="font-medium block">
                  Country
                </label>
                <Field
                  type="text"
                  name="country"
                  id="country"
                  className="text-lg border-2 border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <StyledErrorMessage name="country" />
              </div>

              <div className="mb-4">
                <label htmlFor="region" className="font-medium block mb-1">
                  Region
                </label>
                <Field
                  as="select"
                  name="region"
                  id="region"
                  className="text-lg border border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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

              <div className="mb-4">
                <label htmlFor="description" className="font-medium block">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  id="description"
                  className="text-lg border-2 border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                  rows="4"
                />
                <StyledErrorMessage name="description" />
              </div>

              <div className="mb-4">
                <label htmlFor="category" className="font-medium block mb-1">
                  Category
                </label>
                <Field
                  as="select"
                  name="category"
                  id="category"
                  className="text-lg border border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" label="Select one option" required />
                  {category.map((category) => (
                    <option
                      key={category.category_id}
                      value={category.category_id}
                      label={category.category_name}
                    />
                  ))}
                </Field>
                <StyledErrorMessage name="category" />
              </div>

              <div className="mb-4">
                <label htmlFor="accommodation" className="font-medium block">
                  Accommodation
                </label>
                <Field
                  type="text"
                  name="accommodation"
                  id="accommodation"
                  className="text-lg border-2 border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <StyledErrorMessage name="accommodation" />
              </div>

              <div className="mb-4">
                <input
                  type="file"
                  hidden
                  id="accommodation_image"
                  name="accommodation_image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="accommodation_image"
                  className="inline-flex items-center justify-center px-4 py-2 mt-2 text-white bg-blue-500 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  Upload Accommodation Image
                </label>
                {imagePreview && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    <div className="relative basis-1/4 h-24 overflow-hidden rounded-md border border-gray-300 shadow-md">
                      <img
                        src={imagePreview}
                        alt="Accommodation Preview"
                        className="w-full h-full object-cover"
                      />
                      <a
                        className="absolute top-1 right-1 cursor-pointer text-red-400 hover:text-red-600"
                        onClick={handleDeleteImage}
                        aria-label="Delete image"
                      >
                        X
                      </a>
                    </div>
                  </div>
                )}
                {accommodationImage && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected file: {accommodationImage.name}
                  </p>
                )}
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

export default DestinationForm;
