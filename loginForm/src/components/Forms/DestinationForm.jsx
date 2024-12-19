import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
// import { XMarkIcon } from "@heroicons/react/24/solid";
import StyledErrorMessage from "../../utils/StyledErrorMessage";

const DestinationForm = () => {
  const [region, setRegion] = useState([]);
  const [previousDestination, setPreviousDestination] = useState([]);
  const [category, setCategory] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // store preview image for accommodation
  const [previewImages, setPreviewImages] = useState([]); //store preview images in array
  const [images, setImages] = useState([]); // store images in array
  const [selectedImagesCount, setSelectedImagesCount] = useState(0); // store image count
  const [accommodationImage, setAccommodationImage] = useState(null); // store accommodation images
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  // getting region info
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

  // getting category info
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

  //getting previous destination info
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

  // for destination images change from form
  const onChangeHandler = (event, index) => {
    const selectedImages = event.target.files; // selecting image
    const selectedImagesArray = Array.from(selectedImages); // destructure and selecting each image

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

    // checking images size
    if (images.length + selectedImagesArray.length > 3) {
      toastError("You can only upload a maximum of 3 images.");
      return; // Exit the function if the limit is exceeded
    }

    // Update selected images count
    setSelectedImagesCount((prev) => prev + selectedImagesArray.length);

    //  update the specific index for replaced image
    if (index !== undefined) {
      const updatedImages = [...images];
      updatedImages[index] = selectedImagesArray[0]; // Replace the image at the specified index
      setImages(updatedImages);
    } else {
      setImages((prev) => [...prev, ...selectedImagesArray]);
    }

    const previewImagesArray = selectedImagesArray.map((img) => {
      return URL.createObjectURL(img);
    });

    //update the specific index for replaced image preview
    if (index !== undefined) {
      const updatedPreviewImages = [...previewImages];
      updatedPreviewImages[index] = previewImagesArray[0]; // Replace the preview at the specified index
      setPreviewImages(updatedPreviewImages);
    } else {
      setPreviewImages((prev) => prev.concat(previewImagesArray));
    }
  };

  //  deleting for destination image
  const deleteHandler = (index) => {
    const updatedSelectedImages = [...images];
    const updatedPreviewImages = [...previewImages];

    // Update selected images count
    setSelectedImagesCount((prev) => prev - 1);

    // Remove the image at the specified index
    updatedSelectedImages.splice(index, 1);
    updatedPreviewImages.splice(index, 1);

    setImages(updatedSelectedImages);
    setPreviewImages(updatedPreviewImages);
  };

  // initial values either from database or ""
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

  // auth schema for input validation with Yup
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
    } = values; // destructuring data from input form

    // creating url for editing and creating destination
    let url;
    if (isEdit) {
      url = "http://localhost:3000/backend/editDestination.php";
    } else {
      url = "http://localhost:3000/backend/getDestination.php";
    }

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
      // formdata to send to backend
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
        accommodation_image,
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
    console.log(images);
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
