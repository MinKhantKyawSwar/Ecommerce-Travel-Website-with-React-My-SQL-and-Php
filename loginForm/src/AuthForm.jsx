import { Link, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { registerUser } from "./apicalls/auth";
import { useEffect, useState } from "react";
import axios from "axios"

const AuthForm = ({isLoginPage}) => {
  // const [msg, setMsg] = useState("");
  const [errMsg, setErrMsg] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { isProcessing } = useSelector((state) => state.reducer.loader);

  const [inputs, setInputs] = useState({})


  useEffect(()=>{
    setErrMsg('')
  },[])


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
    setErrMsg(errors => ({...errors, [name]: value}))
  }
  
  const inputValidation = async() => {}



  const handleSubmit = async(e) =>{
    e.preventDefault();
    
    if(isLoginPage) {

    }else{
        axios.post("http://localhost:3000/backend/register.php",inputs).then(function(response) {
          console.log(response.data);
          navigate("/login") 
          
        })
        
    }
  }

  return (
    <>
    <form className='flex flex-wrap flex-col items-center justify-center h-screen w-full' method="POST" onSubmit={handleSubmit}>
          <label htmlFor="username" >Username</label>
          <input 
              type="text" 
              name="user"
              onChange={handleChange}
              className='bg-slate-50 border-slate-200 border-2 rounded-md mb-2'/>
          

          <label htmlFor="email">Email</label>
          <input 
              type="text" 
              name="email" 
              onChange={handleChange}
              className='bg-slate-50 border-slate-200 border-2 rounded-md'/>

          <label htmlFor="password">Password</label>
          <input 
              type="password" 
              name="password" 
              onChange={handleChange}
              className='bg-slate-50 border-slate-200 border-2 rounded-md'/>
          
          <label htmlFor="password">Confirm Password</label>
          <input 
              type="password" 
              name="password2" 
              onChange={handleChange}
              className='bg-slate-50 border-slate-200 border-2 rounded-md'/>
          
        <button
              type="submit"
              className="w-full outline-none bg-blue-600 text-white py-2 rounded-md"
              disabled={isProcessing}
              onClick={inputValidation}
            >
              {isLoginPage && !isProcessing && "Login"}
              {!isLoginPage && !isProcessing && "Register"}
              {isLoginPage && isProcessing && "Logging in ..."}
              {!isLoginPage && isProcessing && "Registering ..."}
        </button>
        <p>
              {isLoginPage ? (
                <p>
                  Don't have an account?{" "}
                  <Link
                    to={"/register"}
                    className="font-medium text-blue-400 hover:text-blue-600"
                  >
                    Register Here!
                  </Link>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <Link
                    to={"/login"}
                    className="font-medium text-blue-400 hover:text-blue-600"
                  >
                    Login Here!
                  </Link>
                </p>
              )}
            </p>
    </form>
    
    </>
  )
}

export default AuthForm