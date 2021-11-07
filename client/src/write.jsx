import React, { useContext, useEffect, useState } from 'react'
import "./write.css"
import {Context} from "./App"
import axios from 'axios'
import {useHistory} from "react-router-dom"
function Write() {
    const {state}=useContext(Context)
    const [title,setitle]=useState("")
    const [cat,setcat]=useState("")
    const [desc,setdesc]=useState("")
    const [file,setfile]=useState("")
    const [u,setu]=useState("")
    const history=useHistory()
    const username=state.user.username || u.username;
    // const handlechange=async(e)=>{
    //     console.log(e.target.value);
    //     setcat(e.target.value)
    // }
    // console.log(username);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        // console.log(".......");
        // console.log(state.user);
        // console.log(state.user.username);
        try{
        const c=await axios.post("/categories",{name:cat})
        console.log(c.data);
        }
        catch{}

        const t={username,title,desc,categories:[cat]}
        if(file)
        {
            const data= new FormData()
            console.log(data);
            const filename=Date.now()+file.name
            data.append("name",filename)
            data.append("file",file)
            t.photo=filename
            try{
               await axios.post("/upload",data)
            }
            catch(err)
            {}
        }
        const d=await axios.post("/post/",t)
        console.log(d.status);
        if(d.status === 201)
        {
            history.push(`/`)
        }
        else{
            alert("Wrong Details.(Check your title, it must be unique)")
        }

    }
    useEffect(()=>{
        try{
            state.user.then((e)=>{
                // console.log(e);
                setu(e)
            })
        }
        catch(err)
        {}
    },[])
    return (
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
            onChange={(e)=>{setcat(e.target.value)}}/>
                <textarea type="text" placeholder="Tell your story..." className="writeinput writetext"
                onChange={(e)=>{setdesc(e.target.value)}}></textarea>
            </div>
            <button type="submit" className="writebutton" onClick={handleSubmit}>Publish</button>
            </form>
        </div>
    )
}

export default Write
