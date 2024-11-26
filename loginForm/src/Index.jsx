import React from 'react'
import {Link} from 'react-router-dom'

const Index = () => {
  return (
    <>
        <Link to ="/register" className='p-2 bg-green-700 m-5 text-white'>Register</Link>
        <Link to ="/login" className='p-2 bg-green-700 m-5 text-white'>Login</Link>
    </>
  )
}

export default Index