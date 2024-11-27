import React from 'react'
// import AuthForm from './AuthForm'
import AuthForm from './components/AuthForm'
import Register2 from './Register2'

const Register = () => {
  return (
    <AuthForm isLogin={false}/>
    // <Register2 isLoginPage={false}/>
  )
}

export default Register