import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router';
import Sidebar from "./sidebar";
import {Link} from "react-router-dom"
import "./Singlepost.css"
import {Context} from "./App"
function Singlepost(props) {
    const[post,setpost]=useState({})
    const [u,setu]=useState("")
    const [update,setupdate]=useState(false);
    const {state}=useContext(Context)
    const titleref=useRef(null)
    const descref=useRef(null)
    const catref=useRef(null)
    const location= useLocation();
    const history=useHistory();
    const id=location.pathname.split("/")[2].slice(1)
    const l=state.loc.split(":")
    const PF="http:"+l[0] + "images/";
    // const PF=state.loc + "images/";
    console.log(id);
    // console.log(state.user);
    // console.log(state.user.username);

    useEffect(()=>{
        const getpost=async()=>{
            const d=await axios.get(`/post/${id}`)
            setpost(d.data)
            console.log(d.data);
        }
        getpost();
    },[id])
    try{
        state.user.then((e)=>{
            setu(e.username)
        })

    }
    catch(e)
    {}
    const handleedit=async(e)=>{
        e.preventDefault();
        const t={...post,title:titleref.current.value,desc:descref.current.value,categories:[catref.current.value]}
        const d=await axios.put(`/post/${id}`,t)
        console.log(d.data);
        alert("Post is Updated!!")
        history.push("/")
    }
    const handledelete=async(e)=>{
        e.preventDefault();
        const t={username:post.username}
        const d=await axios.delete(`/post/delete/${id}`,{data:t})
        console.log(d.data);
        history.push("/")
    }
    console.log(PF + post.photo);
    console.log(post.username === state.user?.username);
    console.log(post.username);
    return (
        <div className="singlepost">
            <div className="singlepostwrapper">
            {post.photo && 
            <img src={PF + post.photo || post.photo} className="singlepostimg" alt="" />
            } 
            {!update ? (
                <>
                <h1 className="singleposttitle">
                {post.title}
                {(post.username === state.user?.username) ?
                <div className="singlepostedit">
                <i class="far fa-edit" onClick={(e)=>setupdate(true)}></i>
                <i class="far fa-trash-alt" onClick={handledelete}></i>
                </div>
                :(post.username === u) &&(
                    <div className="singlepostedit">
                <i class="far fa-edit" onClick={(e)=>setupdate(true)}></i>
                <i class="far fa-trash-alt" onClick={handledelete}></i>
                </div>
                )}
            </h1>
                <div className="singlepostinfo">
            <Link to={`/?user=${post.username}`} className="link"><span>Author: {post.username}</span></Link>
            <span>{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className="singlepostdesc">{post.desc}</p></>
                
            ):(
                <div className="updatediv">
                <input type="text"  className="titlesinglepost" autoFocus={true} ref={titleref} placeholder={post.title}/>
                <div className="singlepostinfo">
            <span>Author: {post.username}</span>
            <span>{new Date(post.createdAt).toDateString()}</span>
            </div>
            <input type="text"  className="catsinglepost" autoFocus={true} ref={catref} placeholder={"Add a category"}/>
                <textarea className="descsinglepost" placeholder={post.desc} ref={descref}></textarea>
            <button className="Updatebtn" onClick={handleedit}>Update</button>    
            </div>    
            )
            }  
            </div>
            <Sidebar/>
            
        </div>
    )
}

export default Singlepost
