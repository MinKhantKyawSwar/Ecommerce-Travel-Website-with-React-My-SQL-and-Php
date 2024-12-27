import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StyledErrorMessage from "../../utils/StyledErrorMessage";
import { Navigate, useParams } from "react-router-dom";

const PackageDetailsForm = () => {
  const [region, setRegion] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();

  const [formEntries, setFormEntries] = useState([
    {
      city: "",
      country: "",
      region: "",
      price: "",
      travel_date: null,
      number_of_available_people: "",
      package: id,
    },
  ]);

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
      if (response.data.status === 1) {
        setRegion(response.data.data);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching regions:", error.message);
    }
  };

  const getPrevData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getPackageDetails.php",
        {
          headers: {
            Package_Info_Id: id,
          },
        }
      );
      if (response.data.status === 1) {
        setFormEntries(response.data.data);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching packages:", error.message);
    }
  };

  const addFormEntry = () => {
    setFormEntries((prevEntries) => [
      ...prevEntries,
      {
        city: "",
        country: "",
        region: "",
        price: "",
        travel_date: null,
        number_of_available_people: "",
        package: id,
      },
    ]);
  };

  const removeFormEntry = (index) => {
    setFormEntries((prevEntries) => prevEntries.filter((_, i) => i !== index));
  };

  const handleSubmit = async (values) => {
    let url;
    if (isEdit) {
      url = "http://localhost:3000/backend/editPackageDetails.php";
      try {
        const response = await axios.post(url, values);
        if (response.data.status === 1) {
          toast.success("Packages updated successfully!");
          setRedirect(true);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(
          "An error occurred while submitting data: " + error.message
        );
      }
    } else {
      url = "http://localhost:3000/backend/getPackageDetails.php";
    }
    try {
      const response = await axios.post(url, values);
      if (response.data.status === 1) {
        toast.success("Packages submitted successfully!");
        setRedirect(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while submitting data: " + error.message);
    }
  };

  const handleFieldChange = (index, field, value) => {
    setFormEntries((prevEntries) =>
      prevEntries.map((entry, i) =>
        i === index ? { ...entry, [field]: value } : entry
      )
    );
  };

  useEffect(() => {
    getAllRegion();
  }, []);

  // Effect to check if editing and fetch previous data
  useEffect(() => {
    if (id) {
      setIsEdit(true); // Set isEdit to true if id exists
      getPrevData(); // Fetch previous data
    }
  }, [id]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        transition={Slide}
      />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-center font-semibold text-3xl my-4 text-blue-600">
          Package Details Form
        </h1>
        {redirect && <Navigate to={`/admin`} />}
        <Formik
          initialValues={formEntries}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-6">
              {formEntries.map((entry, index) => (
                <div key={index} className="border p-4 mb-4 rounded-lg">
                  <h2 className="text-lg font-medium mb-2">
                    Package {index + 1}
                  </h2>
                  <div className="mb-4">
                    <label
                      htmlFor={`formEntries.${index}.city`}
                      className="font-medium block"
                    >
                      City
                    </label>
                    <Field
                      type="text"
                      name={`formEntries.${index}.city`}
                      value={entry.city}
                      onChange={(e) =>
                        handleFieldChange(index, "city", e.target.value)
                      }
                      className=" text-lg border-2 border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                    <StyledErrorMessage name={`formEntries.${index}.city`} />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor={`formEntries.${index}.country`}
                      className="font-medium block"
                    >
                      Country
                    </label>
                    <Field
                      type="text"
                      name={`formEntries.${index}.country`}
                      value={entry.country}
                      onChange={(e) =>
                        handleFieldChange(index, "country", e.target.value)
                      }
                      className="text-lg border-2 border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                    <StyledErrorMessage name={`formEntries.${index}.country`} />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor={`formEntries.${index}.region`}
                      className="font-medium block mb-1"
                    >
                      Region
                    </label>
                    <Field
                      as="select"
                      name={`formEntries.${index}.region`}
                      value={entry.region}
                      onChange={(e) =>
                        handleFieldChange(index, "region", e.target.value)
                      }
                      className="text-lg border border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="" label="Select one option" />
                      {region.map((region) => (
                        <option key={region.region_id} value={region.region_id}>
                          {region.region_name}
                        </option>
                      ))}
                    </Field>
                    <StyledErrorMessage name={`formEntries.${index}.region`} />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor={`formEntries.${index}.price`}
                      className="font-medium block"
                    >
                      Price
                    </label>
                    <Field
                      type="number"
                      name={`formEntries.${index}.price`}
                      value={entry.price}
                      onChange={(e) =>
                        handleFieldChange(index, "price", e.target.value)
                      }
                      className="text-lg border-2 border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                    <StyledErrorMessage name={`formEntries.${index}.price`} />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor={`formEntries.${index}.number_of_available_people`}
                      className="font-medium block"
                    >
                      Available People
                    </label>
                    <Field
                      type="number"
                      name={`formEntries.${index}.number_of_available_people`}
                      value={entry.number_of_available_people}
                      onChange={(e) =>
                        handleFieldChange(
                          index,
                          "number_of_available_people",
                          e.target.value
                        )
                      }
                      className="text-lg border-2 border-blue-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                    <StyledErrorMessage
                      name={`formEntries.${index}.number_of_available_people`}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor={`formEntries.${index}.travel_date`}
                      className="font-medium block"
                    >
                      Travel Date
                    </label>
                    <DatePicker
                      selected={entry.travel_date}
                      onChange={(date) =>
                        handleFieldChange(index, "travel_date", date)
                      }
                      className="text-lg border-2 border-teal-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  </div>
                  {!isEdit && (
                    <button
                      type="button"
                      className="text-red-500 border border-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
                      onClick={() => removeFormEntry(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}

              {!isEdit && (
                <button
                  type="button"
                  className="text-blue-600 border border-blue-600 px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
                  onClick={addFormEntry}
                >
                  Add More
                </button>
              )}

              <button
                type="submit"
                className="text-white bg-blue-600 py-3 font-medium w-full text-center rounded-lg hover:bg-teal-700 transition duration-200"
              >
                Submit All
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default PackageDetailsForm;
