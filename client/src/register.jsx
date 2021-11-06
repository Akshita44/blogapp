import React, { useState } from 'react'
import "./register.css"
import {Link,useHistory} from "react-router-dom"
import axios from 'axios'
function Register() {
    const [username,setusername]=useState("")
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const history=useHistory()
    const handleSubmit=async(e)=>{
        try{
            e.preventDefault()
        const d=await axios.post("/auth/register",{username,email,password})
        console.log(d);
        if(!d || d.status !== 201)
        {
            alert("Invalid Credentials")
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
        }

    return (
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
    )
}

export default Register
