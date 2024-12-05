import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../utils/UserContext";
import axios from "axios";

const Profile = () => {
  const { token, userInfo, setUserInfo } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    profile_image: null, // Store the file directly
  });
  const [loading, setLoading] = useState(true); // Add loading state
  const [fileData, setFileData] = useState([]);
  const [previewImage, setPreviewImage] = useState(null); // State for preview image
  const [borderColor, setBorderColor] = useState("border-teal-600"); // State for border color

  // Array of color options
  const colorOptions = [
    "border-teal-600",
    "border-red-600",
    "border-blue-600",
    "border-yellow-600",
    "border-green-600",
    "border-purple-600",
    "border-pink-600",
    "border-orange-600",
    "border-gray-600",
    "border-indigo-600",
  ];

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

  // Handler for form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
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

  if (loading) {
    return <p>Loading user info...</p>; // Show a loading message while waiting for user data
  }

  return (
    <div
      className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg"
    >
      <div className="text-center mb-6">
        {userInfo ? (
          <>
            <div className="text-center absolute right-50">
              <button
                onClick={EditHandler}
                className="text-green-600 font-medium py-2 px-10 mt-4 rounded-lg border border-green-600 hover:bg-green-600 hover:text-white transition duration-200"
              >
                {editMode ? "Go Back" : "Edit"}
              </button>
            </div>
            {!editMode ? (
              <>
                <div className="flex justify-center mb-4">
                  <img
                    src={`http://localhost:3000/backend/${userInfo.profile_image}`}
                    alt="profile"
                    className={`rounded-full w-32 h-32 border-4 ${borderColor} object-cover`}
                  />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {userInfo.username}
                </h2>
                <p className="text-gray-600">Email: {userInfo.email}</p>
                <p className="text-gray-600">Phone: {userInfo.phone}</p>
                <p className="text-gray-600">Role: {userInfo.role}</p>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-3">
                  <label
                    htmlFor="profile_image"
                    className="font-medium block text-gray-700 mb-2"
                  >
                    Profile Image
                  </label>
                  <div className="flex flex-col items-center">
                    <img
                      src={previewImage} // Use the preview image URL
                      alt="profile"
                      className={`rounded-full w-32 h-32 mb-4 border-4 ${borderColor} object-cover`}
                    />
                    <input
                      type="file"
                      name="profile_image"
                      id="profile_image"
                      onChange={handleFileChange}
                      className="text-lg py-2 w-3/4 rounded-lg border border-teal-600 bg-white text-black"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
  <label
    htmlFor="border_color"
    className="font-medium block text-gray-700"
  >
    Border Color
  </label>
  <select
    name="border_color"
    id="border_color"
    onChange={(e) => setBorderColor(e.target.value)}
    className="text-lg border-2 border-teal-600 py-2 w-1/2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600" // Adjusted width
  >
    {colorOptions.map((color) => (
      <option key={color} value={color}>
        {color.replace("border-", "").replace("-600", "")}
      </option>
    ))}
  </select>
</div>

<div className="mb-3">
  <label
    htmlFor="username"
    className="font-medium block text-gray-700"
  >
    Username
  </label>
  <input
    type="text"
    name="username"
    id="username"
    value={formData.username}
    onChange={handleInputChange}
    className="text-lg border-2 border-teal-600 py-2 w-1/2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600" // Adjusted width
  />
</div>

<div className="mb-3">
  <label
    htmlFor="email"
    className="font-medium block text-gray-700"
  >
    Email
  </label>
  <input
    type="email"
    name="email"
    id="email"
    value={formData.email}
    onChange={handleInputChange}
    className="text-lg border-2 border-teal-600 py-2 w-1/2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600" // Adjusted width
  />
</div>

<div className="mb-3">
  <label
    htmlFor="phone"
    className="font-medium block text-gray-700"
  >
    Phone
  </label>
  <input
    type="text"
    name="phone"
    id="phone"
    value={formData.phone}
    onChange={handleInputChange}
    className="text-lg border-2 border-teal-600 py-2 w-1/2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600" // Adjusted width
  />
</div>
                <button
                  type="submit"
                  className="text-white bg-teal-600 py-3 font-medium w-full rounded-lg hover:bg-teal-700 transition duration-200"
                >
                  Save Changes
                </button>
              </form>
            )}
          </>
        ) : (
          <p className="text-gray-600">Loading user info...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
