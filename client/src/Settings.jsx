import React, { useContext, useEffect, useState } from 'react'
import Sidebar from './sidebar'
import "./settings.css"
import {Context} from "./App"
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { getBase64 } from './write'
import Loader from './Loader'
function Settings() {
    const {state,dispatch,isLoading,setisLoading}=useContext(Context)
    const history =useHistory()
    const [file,setfile]=useState("")
    const _id=state.user?._id
    const [update,setupdate]=useState({_id:_id})
    const handlechange=(e)=>{
        setupdate({...update,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        setisLoading(true)
        // console.log(update);
        var t={...update}
        try{
        if(t.username || file)
        {
            const l=await axios.put(`/comment/userid/${_id}`,t)
        }
        }
        catch(e)
        {
            console.log(e);
        }
        // console.log(file);
        if(file)
        {
           const profilepic=await getBase64(file)
           t={...t,profilepic}
        }
        // console.log(update);
        const d=await axios.put(`/auth/update/${_id}`,t)
        console.log(d);
        console.log(d.data);
        setisLoading(false)
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

    return (
        <>
        {isLoading && <Loader></Loader>}
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
            <img src={state.user?.profilepic  || "https://image.flaticon.com/icons/png/512/17/17004.png"} className="profileimg" alt="" />
            } 
                 <label htmlFor="profileimgchange">
                   <i class=" settingspimg far fa-user-circle"></i>
                </label>
                <input type="file" id="profileimgchange" name="profilepic" style={{display:"none"}} onChange={(e)=>{setfile(e.target.files[0])}}/>
                </div>
                
                <label htmlFor="">Username</label>
                <input type="text" placeholder="Username" name="username" onChange={(e)=>handlechange(e)}/>
                <label htmlFor="">Email</label>
                <input type="text" placeholder="Email" name="email" onChange={(e)=>handlechange(e)}/>
                <label htmlFor="">Password</label>
                <input type="password" placeholder="Password" name="password" onChange={(e)=>handlechange(e)}/>
                <button type="submit" className="settingsbutton" onClick={handleSubmit}>Update</button>
                </form>
                
            </div>
            <Sidebar/>
        </div>
        </>
    )
}

export default Settings
