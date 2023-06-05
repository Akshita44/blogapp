import React, { useContext, useEffect, useState } from 'react'
import "./write.css"
import {Context} from "./App"
import axios from 'axios'
import {useHistory} from "react-router-dom"
import Loader from './Loader'
export const getBase64 = file => {
    return new Promise(resolve => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        // console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
    //   console.log(fileInfo);
    });
  };
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
            if(!desc || !title)
            {
                alert("Fill the details-Title and description are mandatory")
                return
            }
            const d=await axios.post("/post/",t)
            setisLoading(false)
            if(d.status === 201)
            {
                history.push(`/`)
            }
            else{
                console.log(d);
                alert("Wrong Details.(Check your title, it must be unique)")
            }
        }
        catch(err)
        {
            alert("Wrong Details.(Check your title, it must be unique)")
        }
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
