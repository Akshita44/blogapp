import React, { useContext, useEffect, useState } from 'react'
import "./register.css"
import {Link,useHistory} from "react-router-dom"
import axios from 'axios'
import { Context } from './App'
import Loader from './Loader'
function Register() {
    const [username,setusername]=useState("")
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const history=useHistory()
    const {state,isLoading,setisLoading}=useContext(Context)
    useEffect(()=>{
        if(state.user)
        {
            history.push("/")
        }
    },[state.user])
    const handleSubmit=async(e)=>{
        try{
            e.preventDefault()
            setisLoading(true)
        const d=await axios.post("/auth/register",{username,email,password})
        if(!d || d.status !== 201)
        {
            alert("Invalid Credentials/Details should be unique")
        }
        else{
            alert("User Registered")
            history.push("/login")
        }
        }
        catch(e)
        {
            alert("Invalid Details")
        }
        setisLoading(false)
    }

    return (
        <>
        {isLoading && <Loader></Loader>}
        <div className="Registerpage">
             <form className="Registerform">
                <h1 className="Registertitle">Register</h1>
                <label htmlFor="">Username</label>
                <input type="text" placeholder="Username" onChange={(e)=>{setusername(e.target.value)}}/>
                <label htmlFor="">Email</label>
                <input type="text" placeholder="Email" onChange={(e)=>{setemail(e.target.value)}}/>
                <label htmlFor="">Password</label>
                <input type="password" placeholder="Password" onChange={(e)=>{setpassword(e.target.value)}}/>
                <button type="submit" className="Registerbutton"  onClick={handleSubmit}>Register</button>
             <Link to="/login" className="loginlink">Login</Link>

             </form>    

        </div>
        </>
    )
}

export default Register
