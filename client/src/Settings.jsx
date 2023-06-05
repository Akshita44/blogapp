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

    useEffect(()=>{
        if(!state.user)
        history.push("/login")
    },[state])

    const handleSubmit=async(e)=>{
        e.preventDefault()
        setisLoading(true)
        var t={...update}
        if(file)
        {
            if(state.user?.profilepic)
            {
                console.log(state.user.profilepic);
                const result = await axios.post(`/image/delete`,{filepath:state.user?.profilepic})
                console.log("res",result);
            }
            const formData = new FormData();
            const filename=Date.now()+file.name
            formData.append("name",filename)
            formData.append("image", file);
            const result = await axios.post(`/image/upload?folder=user`,formData)
            const profilepic=result.data.data.url
           t={...t,profilepic}
        }
        const d=await axios.put(`/auth/update/${_id}`,t)
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
        setisLoading(false)

    }
   
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
