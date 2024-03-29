import React, { useContext, useEffect, useState } from 'react'
import "./write.css"
import {Context} from "./App"
import axios from 'axios'
import {useHistory} from "react-router-dom"
import Loader from './Loader'
function Write() {
    const {state,isLoading,setisLoading}=useContext(Context)
    const [title,setitle]=useState("")
    const [cat,setcat]=useState("")
    const [desc,setdesc]=useState("")
    const [file,setfile]=useState("")
    const [u,setu]=useState("")
    const history=useHistory()
    const handlecatchange=(e)=>{
        if(e.target.value)
        {
            setcat(e.target?.value[0].toUpperCase()+e.target.value?.toLowerCase().slice(1))
        }
        else{
            setcat("")
        }
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setisLoading(true)
        const createdBy=state.user._id || u._id;
        console.log("createdby",createdBy,state.user._id,u._id);
        if(!desc || !title)
        {
            setisLoading(false)
            alert("Fill the details-Title and description are mandatory")
        }
        else{
        const t={createdBy,title,desc}
        try{
            if(cat)
            {
                await axios.post("/categories",{name:cat})
                t.categories=cat
            }
        }
        catch{}
        console.log("t",t);
        if(file)
        {
            console.log(file);
            const formData = new FormData();
            const filename=Date.now()+file.name
            formData.append("name",filename)
            formData.append("image", file);
            const result = await axios.post(`/image/upload?folder=post`,formData)
            t.photo=result.data.data.url
        }
        try{
          
            const d=await axios.post("/posts/",t)
            if(d.status === 201)
            {
                history.push(`/`)
            }
            else{
                console.log(d);
                alert(d)
                // alert("Wrong Details.(Check your title, it must be unique)")
            }
        }
        catch(err)
        {
            console.log(err);
            alert(err);
            // alert("Wrong Details.(Check your title, it must be unique)")
        }
        }
        setisLoading(false)
    }
    useEffect(()=>{
        try{
            if(state.user)
            {
                setu(state.user)
            }
            else{
                history.push("/login")
            }
        }
        catch(err)
        {}
    },[state.user])
    return (
        <>
        {isLoading && <Loader></Loader>}
        <div>
            {file && 
            <img src={URL.createObjectURL(file)} className="writeimg" alt="" />
            } 
            <form className="writeform">
                {/* <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore impedit cum iusto voluptate quas, reiciendis optio blanditiis, corporis quod dolor veritatis temporibus repellendus sit maxime eos hic id neque iure.</p> */}
            <div className="writeFormGroup">
            <label htmlFor="addfile">
            <i class="writeicon fas fa-plus"></i>
            </label>
            <input type="file" id="addfile" style={{display:"none"}} onChange={(e)=>{setfile(e.target.files[0])}}/>
            <input type="text" placeholder="Title" className="writeinput" autoFocus={true} 
            onChange={(e)=>{setitle(e.target.value)}}/>
            
            </div>
            <div className="writeFormGroups">
            <input type="text" className="writeinputcat" placeholder="Add a Category" autoFocus={true} 
            onChange={(e)=>{handlecatchange(e)}}/>
                <textarea type="text" placeholder="Tell your story..." className="writeinput writetext"
                onChange={(e)=>{setdesc(e.target.value)}}></textarea>
            </div>
            <button type="submit" className="writebutton" onClick={handleSubmit}>Publish</button>
            </form>
        </div>
        </>
    )
}

export default Write
