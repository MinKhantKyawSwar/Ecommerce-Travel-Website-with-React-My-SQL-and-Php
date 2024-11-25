import React, { useState, useEffect } from 'react'

const Registeration = () => {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setpassword2] = useState("");
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");


    useEffect(()=>{
        setTimeout(function(){
            setMsg("")
        },15000)
    },[])

    const handleInputChange = (e, type) =>{
        switch(type){
            case "user":
                setError("");
                setUser(e.target.value)
                if (e.target.value ===""){
                    setError("Username is blank!");
                }
                break;
            
            
            case "email":
                setError("");
                setEmail(e.target.value)
                if (e.target.value ===""){
                    setError("Email is blank!");
                }
                break;
        
            case "password":
                setError("");
                setPassword(e.target.value)
                if (e.target.value ===""){
                    setError("Password is blank!");
                }
                break;
            
            case "password2":
                setError("");
                setpassword2(e.target.value)
                if (e.target.value ===""){
                    setError("Confirm Password is blank!");
                }
                else if(e.target.value !== password){
                    setError("Confirm Password does not match with Password!");
                }
                else{
                    setMsg("All fields are valid!")
                }
                break;
            default :
        }
    }

    function handleSubmit(){
        if(user !== "" && email !=="" && password !== "" && password2 !==""){
            var url = "http://localhost/backend/registration.php";
            var headers = {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            }
            var Data = {
                user: user,
                email : email,
                password : password2
            }
            fetch(url, {
                method: "POST",
                headers : headers,
                body: JSON.stringify(Data)
            }).then((response)=> response.json())
            .then((response)=>{
                setMsg(response[0].result)
            }).catch((err)=>{
                setError(err);
                console.log(err) 
            })
            setUser("")
            setEmail("")
            setPassword("")
            setPassword2("")
        }
        else{
            setError("All Fields are required!")
        }
    }

    function checkUser(){
        var url = "http://localhost/react/checkuser.php";
        var headers = {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        }
        var Data = {
            user: user,
        }
        fetch(url, {
            method: "POST",
            headers : headers,
            body: JSON.stringify(Data)
        }).then((response)=> response.json())
        .then((response)=>{
            setError(response[0].result)
        }).catch((err)=>{
            setError(err);
            console.log(err) 
        })
    }

    function checkEmail(){
        var url = "http://localhost/react/checkemail.php";
        var headers = {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        }
        var Data = {
            email: email,
        }
        fetch(url, {
            method: "POST",
            headers : headers,
            body: JSON.stringify(Data)
        }).then((response)=> response.json())
        .then((response)=>{
            setError(response[0].result)
        }).catch((err)=>{
            setError(err);
            console.log(err) 
        })
    }

  return (
    <section>
        <form className='flex flex-wrap flex-col items-center justify-center'>
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
                onBlur={checkEmail}
                className='bg-slate-50 border-slate-200 border-2 rounded-md'/>

            <label htmlFor="password">Password</label>
            <input 
                type="text" 
                name="password" 
                value={password} 
                onChange={(e)=>handleInputChange(e, "password")}
                className='bg-slate-50 border-slate-200 border-2 rounded-md'/>
            
            <label htmlFor="password">Confirm Password</label>
            <input 
                type="text" 
                name="password2" 
                value={password2} 
                onChange={(e)=>handleInputChange(e, "password2")}
                className='bg-slate-50 border-slate-200 border-2 rounded-md'/>
            
            <input 
                type="submit" 
                defaultValue="submit"
                className='bg-blue-500 text-white h-10 w-32 border-blue-500 mt-5 border-2 rounded-md'
                /> 
        </form>
    </section>
  )
}

export default Registeration