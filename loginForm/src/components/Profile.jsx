import React, { useContext } from 'react'
import { UserContext } from '../utils/UserContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { token, updateToken, userInfo, setUserInfo } = useContext(UserContext);

  const EditHandler = () => {
    
  } 
    
  return (
    <>
      <div>
        <img src="" alt="logo" />
        <p>User Id: {userInfo.customer_id}</p>
        <p>Username: {userInfo.username}</p>
        <p>Role: {userInfo.role}</p>
        <p>Email: {userInfo.email}</p>
        <p>Phone : {userInfo.phone}</p>
        <p>Created_At{userInfo.Created_At}</p>
        <p>City: {userInfo.city}</p>
        <p>Country {userInfo.country}</p>
      </div>
      <div className='pt-5'>
        <Link to="/profile/manage-profile" onClick={EditHandler} className='text-green-600 font-medium py-2 px-20 mt-10 rounded hover:bg-green-600 hover:text-white'>Edit</Link>
      </div>

    </>
  )
}

export default Profile