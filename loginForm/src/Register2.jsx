import React, { useState, useEffect } from 'react';
import {Link, redirect, useNavigate} from 'react-router-dom'
import axios from "axios"

const Register2 = ({isLoginPage}) => {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");

    const navigate = useNavigate()


    useEffect(()=>{
        setTimeout(function(){
            setMsg("")
        },15000)
    },[])

    const handleInputChange = (e, type) =>{
        const value = e.target.value;

        switch(type){
            case "user":
                setError("");
                setUser(value)
                if (value.length < 5){
                    setError("Username should be less than 5.")
                }
                if (value === ""){
                    setError("Username is blank!");
                }
                
                break;
            
            
            case "email":
                setError("");
                setEmail(value)
                if (value ===""){
                    setError("Email is blank!");
                }
                break;
        
            case "password":
                setError("");
                setPassword(value)
                if (value ===""){
                    setError("Password is blank!");
                }
                break;
            
            case "password2":
                setError("");
                setPassword2(value)
                if (value ===""){
                    setError("Confirm Password is blank!");
                }
                else if(value !== password){
                    setError("Confirm Password does not match with Password!");
                }
                else{
                    setMsg("All fields are valid!")
                }
                break;
            default :
        }
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();

        // checking all the data are entered
        if(user !== "" && email !=="" && password !== "" && password2 !==""){
        //connecting to backend (php)
            var url = isLoginPage ?"http://localhost:3000/backend/login.php" : "http://localhost:3000/backend/register.php" ;

            const Data = {
                user: user,
                email : email,
                password : password2
            }

            if(isLoginPage) {
        
            }else{
                axios.post(url,Data).then(function(response) {
                  console.log(response.data);
                  navigate("/login") 
                  
                })
                
            }
            setUser("")
            setEmail("")
            setPassword("")
            setPassword2("")
        }
        else{
            setError("All Fields are required!")
        }
    }

    const checkUser = (e) =>{
        e.preventDefault();
        var url = "http://localhost/react/checkUser.php";
        var Data = {
            user: user,
        }
        axios.post(url,Data).then(function(response) {
            console.log(response.data);
            
        })
    }

    // function checkEmail(){
    //     var url = "http://localhost/checkemail.php";
    //     var headers = {
    //         "Accept" : "application/json",
    //         "Content-Type" : "application/json"
    //     }
    //     var Data = {
    //         email: email,
    //     }
    //     fetch(url, {
    //         method: "POST",
    //         headers : headers,
    //         body: JSON.stringify(Data)
    //     }).then((response)=> response.json())
    //     .then((response)=>{
    //         setError(response[0].result)
    //     }).catch((err)=>{
    //         setError(err);
    //         console.log(err) 
    //     })
    // }

  return (
    <section>
        <form className='flex flex-wrap flex-col items-center justify-center' method="POST" onSubmit={handleSubmit}>
            <p className='h-24 text-4xl'>
                {
                    msg !=="" ?
                    <span className='text-green-500'>
                        {msg}
                    </span> :
                     <span className='text-red-700'>
                        {error}
                     </span>
                }
            </p>
            <label htmlFor="username" >Username</label>
            <input 
                type="text" 
                name="username" 
                value={user}
                onChange={(e)=>handleInputChange(e, "user")}
                onBlur={checkUser}
                className='bg-slate-50 border-slate-200 border-2 rounded-md'/>

            <label htmlFor="email">Email</label>
            <input 
                type="text" 
                name="email" 
                value={email}
                onChange={(e)=>handleInputChange(e, "email")}
                className='bg-slate-50 border-slate-200 border-2 rounded-md'/>

            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                name="password" 
                value={password} 
                onChange={(e)=>handleInputChange(e, "password")}
                className='bg-slate-50 border-slate-200 border-2 rounded-md'/>
            
            <label htmlFor="password">Confirm Password</label>
            <input 
                type="password" 
                name="password2" 
                value={password2} 
                onChange={(e)=>handleInputChange(e, "password2")}
                className='bg-slate-50 border-slate-200 border-2 rounded-md'/>
            
            <button
                type="submit" 
                // onClick={e=>handleSubmit()}
                className='bg-blue-500 text-white h-10 w-32 border-blue-500 mt-5 border-2 rounded-md'
                >Sign iN</button> 
        </form>
    </section>
  )
}

export default Register2