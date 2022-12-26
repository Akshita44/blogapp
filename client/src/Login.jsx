import React, { useContext, useEffect, useState } from 'react'
import "./login.css"
import {Link,useHistory} from "react-router-dom"
import axios from 'axios'
import {Context} from "./App"
import Loader from './Loader'
function Login() {
    const {dispatch,state,isLoading,setisLoading}=useContext(Context)
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const history=useHistory()
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
        if(!email || !password)
        {
          alert("Fill the details")
          throw new Error("Fill the credentials")
        }
        const d=await axios.post("/auth/login",{email,password})
        console.log(d);
        setisLoading(false)
        if(!d || d.status !== 201)
        {
            alert("Invalid Credentials")
        }
        else{
            alert("User Logged In")
            dispatch({
                type:"Login",
                payload: d.data
            })
            history.push("/")
        }
        }
        catch(err)
        {
            // alert("Invalid Details")
        }
        
    }
    return (
        <>
        {isLoading && <Loader></Loader>}
        <div className="loginpage">
             <form className="loginform">
                <h1 className="logintitle">Login</h1>
                <label htmlFor="">Email</label>
                <input type="text" placeholder="Email" onChange={(e)=>{setemail(e.target.value)}}/>
                <label htmlFor="">Password</label>
                <input type="password" placeholder="Password" onChange={(e)=>{setpassword(e.target.value)}}/>
                <button type="button" className="loginbutton" onClick={handleSubmit}>Login</button>
                <Link to="/register" className="registerbutton">Register</Link>
             </form>    
        </div>
        </>
    )
}

export default Login
