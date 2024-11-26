import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { checkCurrentUser } from '../apicalls/auth';

const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getCurrentUser = async() => {
       
    }

  return (
    <>
    </>
  )
}

export default AuthProvider