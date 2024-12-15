import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
// import { XMarkIcon } from "@heroicons/react/24/solid";
import StyledErrorMessage from "../../components/StyledErrorMessage";

const DestinationForm = () => {
  const [region, setRegion] = useState([]);
  const [previousDestination, setPreviousDestination] = useState([]);
  const [error, setError] = useState("");
  const [category, setCategory] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);
  const [savedImages, setSavedImages] = useState([]);
  const [selectedImagesCount, setSelectedImagesCount] = useState(0);
  const [accommodationImage, setAccommodationImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

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

  const getPrevDestinationInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/backend/getDestination.php?id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === 0) {
        console.log(response.data.message);
      } else if (response.data.status === 1) {
        setPreviousDestination(response.data.data);
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

  console.log(imagePreview)
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
    destination_name: previousDestination.destination_name || "",
    country: previousDestination.country || "",
    region: previousDestination.region || "",
    description: previousDestination.description || "",
    category: previousDestination.category || "",
    accommodation: previousDestination.accommodation || "",
    destination_image: previousDestination.destination_image || "",
    destination_second_image:
      previousDestination.destination_second_image || "",
    destination_third_image: previousDestination.destination_third_image || "",
    accommodation_image: previousDestination.accommodation_image || "",
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
    } = values;

    let url = "http://localhost:3000/backend/getDestination.php";

    // Validation for required fields
    const requiredImagesCount = 3; // Assuming you need 3 destination images
    if (images.length < requiredImagesCount) {
      toast.error(
        `You must upload at least ${requiredImagesCount} destination images.`,
        {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        }
      );
      return; // Exit the function if validation fails
    }

    if (!accommodationImage) {
      toast.error("You must upload an accommodation image.", {
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
      const formData = new FormData();
      formData.append("id", id);
      formData.append("destination_name", destination_name);
      formData.append("country", country);
      formData.append("region", region);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("accommodation", accommodation);

      // Append new destination images
      if (images.length > 0) {
        formData.append("destination_image", images[0]);
      }
      if (images.length > 1) {
        formData.append("destination_second_image", images[1]);
      }
      if (images.length > 2) {
        formData.append("destination_third_image", images[2]);
      }

      // Append accommodation image
      formData.append("accommodation_image", accommodationImage);
      console.log(images[0])
      console.log(images[1])
      console.log(images[2])

      let response;
      // Send the form data to the server
      if (!isEdit) {
        response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        response = await axios.put(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

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
    getAllCategories();
    getAllRegion();
  }, []);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      getPrevDestinationInfo();
    } else {
      setIsEdit(false);
    }
  }, [id]);

  useEffect(() => {
    if (previousDestination) {
      const {
        destination_image,
        destination_second_image,
        destination_third_image,
        accommodation_image, // Add this line
      } = previousDestination;

      const previews = [];
      const pushImages = [];

      if (destination_image) {
        previews.push(`http://localhost:3000/backend/${destination_image}`);
        pushImages.push(destination_image);
      }
      if (destination_second_image) {
        previews.push(
          `http://localhost:3000/backend/${destination_second_image}`
        );
        pushImages.push(destination_second_image);
      }
      if (destination_third_image) {
        previews.push(
          `http://localhost:3000/backend/${destination_third_image}`
        );
        pushImages.push(destination_third_image);
      }

      // Set the accommodation image if it exists
      if (accommodation_image) {
        setAccommodationImage(
          `http://localhost:3000/backend/${accommodation_image}`
        );

        setImagePreview(`http://localhost:3000/backend/${accommodation_image}`); // Set the preview as well
      }

      setPreviewImages(previews);

      // Also set the images state to keep track of the original images
      setImages(previews);
      setSelectedImagesCount(previews.length);
    }
  }, [previousDestination]);

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
                  <option value="" label="Select one option" />
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
                  className="text-lg border border-blue- ```javascript
600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
