import React from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import DatePicker from "react-datepicker";

const PassportForm = () => {
  const initialValues = { 
    travel_date: "",
    country: "",
    city: "",
    payment_method: "",
    number_of_people: 0,
    add_on: "",
    discount: "",
    passports: [],
  };

  const handleSubmit = (values) => {
    console.log("Submitted Values:", values);
    alert("Passport details submitted successfully!");
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-teal-600 text-center mb-4">
        Passport Details Form
      </h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form className="space-y-4">
            {/* Number of People Input */}
            <div className="mb-3">
              <label htmlFor="travel_date" className="font-medium block mb-1">
                Select Your Travel Date! (*be sure to choose it first to show up
                your start location!)
              </label>
              <DatePicker
                 
                className="text-lg border border-teal-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholderText="Select a travel date"
              />
            </div>

           
            <div>
              <label className="font-medium block mb-1">Number of People</label>
              <Field
                type="number"
                name="number_of_People"
                min="0"
                onChange={(e) => {
                  const count = parseInt(e.target.value, 10) || 0;
                  setFieldValue("number_of_People", count);

                  const updatedPassports = Array.from(
                    { length: count },
                    (_, i) => ({
                      fullName: "",
                      passportNumber: "",
                      expirationDate: "",
                    })
                  );

                  setFieldValue("passports", updatedPassports);
                }}
                className="text-lg border border-teal-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            {/* Passport Details */}
            <FieldArray name="passports">
              {({ remove, push }) => (
                <>
                  {values.passports.map((_, index) => (
                    <div key={index} className="mb-4 border rounded-lg p-4">
                      <h4 className="font-bold text-teal-600 mb-2">
                        Passenger {index + 1}
                      </h4>
                      <div className="mb-3">
                        <label className="font-medium block mb-1">
                          Full Name
                        </label>
                        <Field
                          type="text"
                          name={`passports.${index}.fullName`}
                          className="text-lg border border-teal-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="font-medium block mb-1">
                          Passport Number
                        </label>
                        <Field
                          type="text"
                          name={`passports.${index}.passportNumber`}
                          className="text-lg border border-teal-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="font-medium block mb-1">
                          Expiration Date
                        </label>
                        <Field
                          type="date"
                          name={`passports.${index}.expirationDate`}
                          className="text-lg border border-teal-600 py-2 px-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                      </div>
                      {/* Optional Remove Button */}
                      {values.numberOfPeople > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            remove(index);
                            setFieldValue(
                              "numberOfPeople",
                              values.numberOfPeople - 1
                            );
                          }}
                          className="text-red-600 text-sm underline mt-1"
                        >
                          Remove Passenger
                        </button>
                      )}
                    </div>
                  ))}
                </>
              )}
            </FieldArray>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PassportForm;
