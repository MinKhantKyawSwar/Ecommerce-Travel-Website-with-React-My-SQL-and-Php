import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../providers/UserContext";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { userInfo, setUserInfo, setIsEmail } = useContext(UserContext);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    profile_image: null, // Store the file directly
  });
  const [loading, setLoading] = useState(true); // Add loading state
  const [fileData, setFileData] = useState([]);
  const [bookedData, setBookedData] = useState([]);
  const [previewImage, setPreviewImage] = useState(null); // State for preview image
  const navigate = useNavigate();

  // Use useEffect to set formData when userInfo changes (initial loading)
  useEffect(() => {
    if (userInfo) {
      setFormData({
        username: userInfo.username,
        email: userInfo.email,
        phone: userInfo.phone,
        profile_image: userInfo.profile_image, // Set profile image file path
      });
      setLoading(false); // Set loading to false once userInfo is available
      setFileData(userInfo.profile_image);
      setPreviewImage(
        `http://localhost:3000/backend/${userInfo.profile_image}`
      ); // Set initial preview image
    }
  }, [userInfo]);

  const fetchBookingData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getBooking.php",
        {
          headers: {
            User_Id: localStorage.getItem("user_id"),
          },
        }
      );
      if (response.data.status === 1) {
        setBookedData(response.data.data); // Assuming the response contains bookings
      } else {
        // console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };

  useEffect(() => {
    fetchBookingData();
  }, []);

  // Handler for form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} to ${value}`); // Debug log
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        profile_image: file, // Store the entire file object
      }));
      setPreviewImage(URL.createObjectURL(file)); // Create a preview URL for the selected file
    }
  };

  // Toggle Edit Mode
  const EditHandler = () => {
    setEditMode(!editMode);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, phone, profile_image } = formData;
    const url = "http://localhost:3000/backend/editProfile.php";

    const formDataToSend = new FormData();
    formDataToSend.append("username", username);
    formDataToSend.append("email", email);
    formDataToSend.append("phone", phone);
    if (profile_image) {
      formDataToSend.append("profile_image", profile_image); // Append the file object
    } else {
      formDataToSend.append("profile_image", "");
    }

    try {
      const response = await axios.post(url, formDataToSend, {
        headers: {
          // Content-Type is not required here as axios will set it automatically for FormData
        },
      });

      if (response.data.status === 1) {
        console.log(response.data);
        setUserInfo(response.data.userInfo);
        setEditMode(false); // Close edit mode
        window.location.reload();
      } else {
        console.log(response.data.message); // Show error if something goes wrong
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };
  const detailsHandler = (id) => {
    navigate(`/recipts/${id}`);
  };

  if (loading) {
    return <p>Loading user info...</p>; // Show a loading message while waiting for user data
  }

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
      <div className="container mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex flex-col lg:flex-row items-center lg:items-start mb-6">
          {userInfo ? (
            <>
              {!editMode ? (
                <div className="w-full">
                  <div className="flex flex-col lg:flex-row items-center lg:items-start">
                    <img
                      src={`http://localhost:3000/backend/${userInfo.profile_image}`}
                      alt="profile"
                      className="w-24 h-24 lg:w-36 lg:h-36 rounded-badge border-4 object-cover mx-auto lg:mx-10 mb-4 lg:mb-0"
                    />
                    <div className="text-center lg:text-left">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                        {userInfo.username}
                      </h2>
                      <p className="text-gray-600">{userInfo.email}</p>
                      <p className="text-gray-600">{userInfo.phone}</p>
                    </div>
                  </div>
                  <div className="flex justify-center lg:justify-end mt-6 lg:absolute lg:right-20 lg:top-32">
                    <button
                      onClick={EditHandler}
                      className="py-2 px-6 rounded-lg border border-gray-800 hover:bg-gray-900 hover:text-white transition duration-200"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  {/* Go Back Button */}
                  <div className="flex justify-start">
                    <button
                      onClick={EditHandler}
                      className=" border border-black hover:text-white hover:bg-black py-2 px-6 rounded-lg shadow-md transition duration-200"
                    >
                      Go Back
                    </button>
                  </div>

                  {/* Form Container */}
                  <div className="flex flex-col items-center justify-center mt-6">
                    <form
                      onSubmit={handleSubmit}
                      className="w-full max-w-md space-y-6 bg-white p-8 shadow-xl rounded-lg border border-gray-200"
                    >
                      {/* Profile Image Section */}
                      <div className="flex flex-col items-center">
                        <label
                          htmlFor="profile_image"
                          className="font-medium text-gray-700 mb-2"
                        >
                          Profile Image
                        </label>
                        <img
                          src={previewImage}
                          alt="Profile Preview"
                          className="rounded-full w-24 h-24 lg:w-32 lg:h-32 mb-4 border-2 border-black object-cover shadow-md hover:scale-105 transition-transform duration-300"
                        />
                        <input
                          type="file"
                          id="profile_image"
                          onChange={handleFileChange}
                          className="block w-full text-gray-700 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 transition duration-200"
                        />
                      </div>

                      {/* Username Field */}
                      <div>
                        <label
                          htmlFor="username"
                          className="font-medium block text-gray-700 mb-2"
                        >
                          Username
                        </label>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          className="w-full text-lg border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 shadow-sm transition duration-200"
                        />
                      </div>

                      {/* Email Field */}
                      <div>
                        <label
                          htmlFor="email"
                          className="font-medium block text-gray-700 mb-2"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full text-lg border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 shadow-sm transition duration-200"
                        />
                      </div>

                      {/* Phone Field */}
                      <div>
                        <label
                          htmlFor="phone"
                          className="font-medium block text-gray-700 mb-2"
                        >
                          Phone
                        </label>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full text-lg border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 shadow-sm transition duration-200"
                        />
                      </div>

                      {/* Reset Password Button */}
                      <div className="flex items-center justify-between">
                        <a
                          className="cursor-pointer mt-6 py-2 px-6 rounded-lg border border-gray-800 hover:bg-gray-900 hover:text-white transition duration-200 text-center w-full"
                          onClick={() =>
                            document.getElementById("my_modal_3").showModal()
                          }
                        >
                          Reset Password
                        </a>
                      </div>

                      {/* Save Changes Button */}
                      <button
                        type="submit"
                        className="w-full bg-gray-800 text-white py-3 font-medium rounded-lg hover:bg-black shadow-md transition duration-200"
                      >
                        Save Changes
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-600">Loading user info...</p>
          )}
        </div>

        {/* Modal */}
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <h3 className="font-bold text-lg">Enter Your email to reset</h3>
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
                Reset Password
              </button>
            </form>
          </div>
        </dialog>
      </div>

    </>
  );
};

export default Profile;
