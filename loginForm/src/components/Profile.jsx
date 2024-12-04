import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../utils/UserContext';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { token, userInfo, setUserInfo } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    profile_image: null, // Store the file directly
  });
  const [loading, setLoading] = useState(true); // Add loading state

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
    formDataToSend.append('username', username);
    formDataToSend.append('email', email);
    formDataToSend.append('phone', phone);
    if (profile_image) {
      formDataToSend.append('profile_image', profile_image); // Append the file object
    } else {
      formDataToSend.append('profile_image', "");
    }

    try {
      const response = await axios.post(url, formDataToSend, {
        headers: {
          // Content-Type is not required here as axios will set it automatically for FormData
        },
      });

      if (response.data.status === 1) {
        console.log(response.data);
        setUserInfo(response.data.userInfo); // Update user info in context
        setEditMode(false); // Close edit mode
      } else {
        console.log(response.data.message); // Show error if something goes wrong
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };

  // Wait until loading is false to render the profile
  if (loading) {
    return <p>Loading user info...</p>; // Show a loading message while waiting for user data
  }

  return (
    <div>
      <div>
        {/* Check if userInfo is loaded */}
        {userInfo ? (
          <>
            <img 
              src={`http://localhost:3000/backend/pictures/profile/${userInfo.profile_image}`} 
              alt="profile" 
            />
            {!editMode ? (
              <>
                <p>Username: {userInfo.username}</p>
                <p>Email: {userInfo.email}</p>
                <p>Phone: {userInfo.phone}</p>
              </>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="font-medium block">Username</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="font-medium block">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="font-medium block">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="profile_image" className="font-medium block">Profile Image</label>
                  <input
                    type="file"
                    name="profile_image"
                    id="profile_image"
                    onChange={handleFileChange}
                    className="text-lg py-1 w-full rounded-lg"
                  />
                </div>

                <button
                  type="submit"
                  className="text-white bg-teal-600 py-4 font-medium w-full text-center"
                >
                  Save Changes
                </button>
              </form>
            )}
          </>
        ) : (
          <p>Loading user info...</p>
        )}
      </div>

      <div className="pt-5">
        <button
          onClick={EditHandler}
          className="text-green-600 font-medium py-2 px-20 mt-10 rounded hover:bg-green-600 hover:text-white"
        >
          {editMode ? 'Cancel' : 'Edit'}
        </button>
      </div>
    </div>
  );
};

export default Profile;
