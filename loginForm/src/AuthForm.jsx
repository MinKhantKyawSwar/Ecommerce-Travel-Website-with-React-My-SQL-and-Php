import { Link, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { registerUser } from "./apicalls/auth";
import { useState } from "react";


const AuthForm = ({isLoginPage}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isProcessing } = useSelector((state) => state.reducer.loader);

  const [inputs, setInputs] = useState({})

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))

  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(inputs)
  }

  const onFinishHandler = async (e) => {
    e.preventDefault()
    //going into loading stage
    // dispatch(setLoader(true));
    if(isLoginPage) {

    }else{
        try {
          console.log(inputs)

          const response = await registerUser(inputs);
          if (response.isSuccess){
            navigate("/login");
            onsole.log(response)
        }
        }catch (error) {
          console.log(error)
        }
    }
  }

  return (
    <>
    <form className='flex flex-wrap flex-col items-center justify-center h-screen w-full' onSubmit={onFinishHandler}>
          {/* <p className='h-24 text-4xl'>
                {
                    msg !=="" ?
                    <span className='text-green-500'>
                        {msg}
                    </span> :
                     <span className='text-red-700'>
                        {error}
                     </span>
                }
            </p> */}
               <label htmlFor="username" >Username</label>
            <input 
                type="text" 
                name="username"
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