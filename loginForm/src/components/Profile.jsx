import React, { useContext } from 'react'
import { UserContext } from '../utils/UserContext';

const Profile = () => {
  const { token, updateToken, userInfo, setUserInfo } = useContext(UserContext);
    
  return (
    <>
      <p>User Id: {userInfo.customer_id}</p>
      <p>Username: {userInfo.username}</p>
      <p>Role: {userInfo.role}</p>
      <p>Email: {userInfo.email}</p>
      <p>Phone : {userInfo.phone}</p>
      <p>Created_At{userInfo.Created_At}</p>
      <p>City: {userInfo.city}</p>
      <p>Country {userInfo.Country}</p>
    </>
  )
}

export default Profile