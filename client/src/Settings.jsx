import React, { useContext, useEffect, useState } from 'react'
import ak from "./images/aks.jpg"
import Sidebar from './sidebar'
import "./settings.css"
import {Context} from "./App"
import { useHistory } from 'react-router-dom'
import axios from 'axios'
function Settings() {
    const {state,dispatch}=useContext(Context)
    const history =useHistory()
    const [username,setusername]=useState("")
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const [file,setfile]=useState("")
    const _id=state.user?._id
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const t={username,email,password,_id}
        if(file)
        {
            const data= new FormData()
            console.log(data);
            const filename=Date.now()+file.name
            data.append("name",filename)
            data.append("file",file)
            t.profilepic=filename
            try{
               await axios.post("/upload",data)
            }
            catch(err)
            {}
        }
        const d=await axios.put(`/auth/update/${_id}`,t)
        console.log(d);
        console.log(d.data);
        if(d.status === 200)
        {
            dispatch({
                type:"Update",
                payload: d.data
            })
            history.push(`/`)
        }
        else if(d.status === 400)
        {
            alert("Fill the credentials")
        }

    }
    useEffect(()=>{
        if(!state.user)
        history.push("/login")
    },[state])
    const PF=state.loc + "images/";
    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsheadings">
                    <span className="settingsupdate">Update Your Account</span>
                </div>
                <form className="settingsform">
                <label>Profile Picture</label>
                
                <div className="settingspp">
                {file ?
            <img src={URL.createObjectURL(file)} className="profileimg" alt="" />:
            <img src={ PF + state.user?.profilepic  || "https://image.flaticon.com/icons/png/512/17/17004.png"} className="profileimg" alt="" />
            } 
                 <label htmlFor="profileimgchange">
                   <i class=" settingspimg far fa-user-circle"></i>
                </label>
                <input type="file" id="profileimgchange" style={{display:"none"}} onChange={(e)=>{setfile(e.target.files[0])}}/>
                </div>
                
                <label htmlFor="">Username</label>
                <input type="text" placeholder="Username" onChange={(e)=>{setusername(e.target.value)}}/>
                <label htmlFor="">Email</label>
                <input type="text" placeholder="Email" onChange={(e)=>{setemail(e.target.value)}}/>
                <label htmlFor="">Password</label>
                <input type="password" placeholder="Password" onChange={(e)=>{setpassword(e.target.value)}}/>
                <button type="submit" className="settingsbutton" onClick={handleSubmit}>Update</button>
                </form>
                
            </div>
            <Sidebar/>
        </div>
    )
}

export default Settings
