import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
// import { XMarkIcon } from "@heroicons/react/24/solid";
import StyledErrorMessage from "../../components/StyledErrorMessage";

const DestinationForm = () => {
  const [region, setRegion] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState("");
  const [category, setCategory] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);
  const [savedImages, setSavedImages] = useState([]);
  const [selectedImagesCount, setSelectedImagesCount] = useState(0);

  const onChangeHandler = (event) => {
    const seletedImages = event.target.files;
    const seletedImagesArray = Array.from(seletedImages);

    //update selected images count
    setSelectedImagesCount((prev) => prev + seletedImagesArray.length);

    setImages((prev) => [...prev, ...seletedImagesArray]);

    const previewImagesArray = seletedImagesArray.map((img) => {
      console.log(img)
      return URL.createObjectURL(img);
    });
    setPreviewImages((prev) => prev.concat(previewImagesArray));
  };

  const deleteHandler = (img) => {
    const indexToDelete = previewImages.findIndex((e) => e === img);

    // update selected images count
    setSelectedImagesCount((prev) => prev - 1);

    if (indexToDelete !== -1) {
      const updatedSeletedImages = [...images];
      updatedSeletedImages.splice(indexToDelete, 1);

      setImages(updatedSeletedImages);
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
    accomodation: "",
    destination_image: "",
    destination_second_image: "",
    destination_third_image: "",
    accomodation_image: "",
  };

  const AuthFormSchema = Yup.object({
    destination_name: Yup.string().required("Destination Name is required."),
    country: Yup.string().required("Country is required."),
    region: Yup.string().required("Region is required."),
    description: Yup.string().required("Description is required."),
    category: Yup.string().required("Type is required."),
    accomodation: Yup.string().required("Type is required."),
  });

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(URL.createObjectURL(file));
      setError("");
      setFieldValue("destination_image", file);
    } else {
      setError("Please select a valid image file.");
      setSelectedImage(null);
    }
  };

  const submitHandler = async (values) => {
    const {
      destination_name,
      country,
      region,
      description,
      category,
      accomodation,
      destination_image,
      destination_second_image,
      destination_third_image,
      accomodation_image,
    } = values;

    let url = "http://localhost:3000/backend/getDestination.php";

    const data = {
      destination_name,
      country,
      region,
      description,
      category,
      accomodation,
      destination_image,
      destination_second_image,
      destination_third_image,
      accomodation_image,
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
    // return <Navigate to={isLogin ? "/" : "/login"} />;
  }

  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <Formik
          initialValues={initialValues}
          validationSchema={AuthFormSchema}
          onSubmit={submitHandler}
        >
          {({ isSubmitting }) => (
            <Form
              className="space-y-4"
              method="post"
              encType="multipart/form-data"
            >
              <h1 className="text-center font-semibold text-3xl my-4 text-blue-600">
                Destination Form
              </h1>
              <div className="mb-3">
                <label htmlFor="destination_name" className="font-medium block">
                  Destination Name
                </label>
                <Field
                  type="text"
                  name="destination_name"
                  id="destination_name"
                  values={initialValues.destination_name}
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
              <label htmlFor="upload" className="cursor-pointer text-blue-500">
                Upload Images
              </label>
              <div className="flex gap-2 mt-4">
                {previewImages.map((img, index) => (
                  <div key={index} className="basis-1/6 h-29 relative">
                    <img
                      src={img}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <button
                      width={30}
                      height={25}
                      className="absolute z-20 top-0 right-0 text-red-400 hover:text-red-600"
                      onClick={() => deleteHandler(img)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>

              <div className="mb-3">
                <label htmlFor="country" className="font-medium block">
                  Country
                </label>
                <Field
                  type="text"
                  name="country"
                  id="country"
                  values={initialValues.country}
                  className="text-lg border-2 border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <StyledErrorMessage name="country" />
              </div>

              <div className="mb-3">
                <label htmlFor="region" className="font-medium block mb-1">
                  Region
                </label>
                <Field
                  as="select"
                  name="region"
                  id="region"
                  values={initialValues.region}
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

              <div className="mb-3">
                <label htmlFor="description" className="font-medium block">
                  Description
                </label>
                <Field
                  as="textarea" // Change this line to use a textarea
                  name="description"
                  id="description"
                  values={initialValues.description}
                  className="text-lg border-2 border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                  rows="4" // You can specify the number of rows for the textarea
                />
                <StyledErrorMessage name="description" />
              </div>

              <div className="mb-3">
                <label htmlFor="category" className="font-medium block mb-1">
                  Category
                </label>
                <Field
                  as="select"
                  name="category"
                  id="category"
                  values={initialValues.category}
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
                <StyledErrorMessage name="region" />
              </div>

              <div className="mb-3">
                <label htmlFor="accomodation" className="font-medium block">
                  Accomodation
                </label>
                <Field
                  type="text"
                  name="accomodation"
                  id="accomodation"
                  values={initialValues.accomodation}
                  className="text-lg border-2 border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <StyledErrorMessage name="accomodation" />
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
