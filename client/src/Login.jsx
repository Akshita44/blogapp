import React, { useContext, useState } from 'react'
import "./login.css"
import {Link,useHistory} from "react-router-dom"
import axios from 'axios'
import {Context} from "./App"
function Login() {
    const {dispatch}=useContext(Context)
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const history=useHistory()
    const handleSubmit=async(e)=>{
        try{
            e.preventDefault()
        const d=await axios.post("/auth/login",{email,password})
        console.log(d);
        // console.log(d.data);
        // console.log(d.data.username);
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
            alert("Invalid Details")
        }
        
    }
    return (
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
    )
}

export default Login
