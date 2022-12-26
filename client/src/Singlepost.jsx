import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router';
import Sidebar from "./sidebar";
import {Link} from "react-router-dom"
import "./Singlepost.css"
import {Context} from "./App"
import { getBase64 } from './write'
import Accordion from 'react-bootstrap/Accordion';
import Loader from './Loader'

function Singlepost(props) {
    const[post,setpost]=useState({})
    const [u,setu]=useState("")
    const [update,setupdate]=useState(false);
    const {state,isLoading,setisLoading}=useContext(Context)
    const [title,settitle]=useState(false)
    const [desc,setdesc]=useState(false)
    const [cat,setcat]=useState(false)
    const [comment,setcomment]=useState("")
    const descref=useRef(null)
    const catref=useRef(null)
    const titleref=useRef(null);
    const [file,setfile]=useState()
    const location= useLocation();
    const history=useHistory();
    const commentref=useRef(null)
    const [comments,setcomments]=useState([])
    const [ifcomment,setifcomment]=useState(false)
    const id=location.pathname.split("/")[2].slice(1)
    console.log(id,state.user);

    useEffect(()=>{
        const getpost=async()=>{
            setisLoading(true)
            const d=await axios.get(`/post/${id}`)
            setpost(d.data)
            setisLoading(false)
            console.log(d.data);
        }
        getpost();
    },[id])

    useEffect(()=>{
        const data=async()=>{
            setisLoading(true)
            const d=await axios.get(`/comment/postid/${id}`)
            setcomments(d.data)
            setisLoading(false)
            console.log(d.data);
        }
        data();
    },[ifcomment])

    try{
        state.user.then((e)=>{
            setu(e.username)
        })
    }
    catch(e){}
    const handleedit=async(e)=>{
        e.preventDefault();
        setisLoading(true)
        // console.log(titleref.current.value);
        var t={...post}
        if(title)
        {
            t={...t,title:titleref.current.value}
        }
        if(desc)
        {
            t={...t,desc:descref.current.value}
        }
        if(cat)
        {
            try{
                const c=await axios.post("/categories",{name:catref.current.value})
                // console.log(c.data);
                t={...t,categories:catref.current.value}
                }
            catch{}
        }
        if(file)
        {
            const document= await getBase64(file)
            t={...t,photo:document}
        }
        console.log(t);
        const d=await axios.put(`/post/${id}`,t)
        // console.log(d.data);
        setisLoading(false)
        alert("Post is Updated!!")
        history.push("/")
    }
    const handledelete=async(s,dict)=>{
        setisLoading(true)
        const d=await axios.delete(s,{data:dict})
        // console.log(d.data);
        setisLoading(false)
        alert("Deleted successfully")
        history.push("/")
    }
    const handlecomment=async()=>{
        try{
        const t={username:state.user.username,profilepic:state.user.profilepic,comment,postID:id,userID:state.user._id}
        const d=await axios.post(`/comment`,t)
        setifcomment(!ifcomment)
        // console.log(d.data);
        commentref.current.value=""
        alert("Comment Added Successfully")
        }
        catch(e)
        {}
    }
    return (
        <>
        {isLoading && <Loader></Loader>}
        <div className="singlepost">
            <div className="singlepostwrapper">
            {post.photo && 
            <img src={file ? URL.createObjectURL(file):post.photo} className="singlepostimg" alt="" />
            } 
            {!update ? (
                <>
                <h1 className="singleposttitle">
                {post.title}
                {state.user?.role === "admin" &&(
                    <div className="singlepostedit">
                    <i class="far fa-trash-alt" target="Delete post" onClick={()=>handledelete(`/post/delete/${id}`,{username:post.username})}></i>
                    </div>
                )}
                {( state.user?.role !== "admin" && post.username === state.user?.username) ?
                <div className="singlepostedit">
                <i class="far fa-edit" target="Edit post" onClick={(e)=>setupdate(true)}></i>
                <i class="far fa-trash-alt"  target="Delete post" onClick={()=>handledelete(`/post/delete/${id}`,{username:post.username})}></i>
                </div>
                :(post.username === u) &&(
                    <div className="singlepostedit">
                <i class="far fa-edit" target="Edit post" onClick={(e)=>setupdate(true)}></i>
                <i class="far fa-trash-alt" target="Delete post" onClick={()=>handledelete(`/post/delete/${id}`,{username:post.username})}></i>
                </div>
                )}
            </h1>
                <div className="singlepostinfo">
            <Link to={`/?user=${post.username}`} className="link"><span>Author: {post.username}</span></Link>
            <span>{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className="singlepostdesc">{post.desc}</p>
            <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Add Comments</Accordion.Header>
              
                {state.user?(
                    <Accordion.Body>
              <textarea className="descsinglepost" placeholder='Add a Comment...' ref={commentref} onChange={(e)=>setcomment(e.target.value)}></textarea>
              <button className="Updatebtn" onClick={handlecomment}>Add</button></Accordion.Body>):(
                <Accordion.Body>
                     <Link to={`/login`} className="link"><span>Login to add comments</span></Link>
                </Accordion.Body>
              )}  
              
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>See Comments</Accordion.Header>
              <Accordion.Body>
                {comments&& comments.map((comment)=>(
                    <div>
                    <div>
                    <span style={{marginRight:"10px"}}><img src={comment.profilepic? comment.profilepic : "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"} className="profileimg" alt="" />
                    </span>
                    <span>{comment.username}</span>
                        <div className="commentsinglepost">
                        {state.user && (state.user.username === comment.username || state.user?.role === "admin" || u)&&
                        <i class="far fa-trash-alt"  target="Delete comment" onClick={()=>handledelete(`/comment/delete/${comment._id}`,{username:comment.username})}></i>}
                        {state.user?.role === "admin" && comment.username !== "admin" &&
                        <button className="delbtn" target="Delete User" onClick={()=>handledelete(`/auth/delete/${comment.userID}`,{role:state.user.role})}>Delete User</button>}
                        </div>
                    {/* {state.user && (state.user.username === comment.username || state.user?.role === "admin" )&&(
                        <div className="commentsinglepost">
                        <i class="far fa-trash-alt" onClick={()=>handledelete(`/comment/delete/${comment._id}`,{username:comment.username})}></i>
                        </div>
                    )} */}
                    </div>
                    <p>{comment.comment}</p>
                </div>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          </>
            ):(
                <div className="updatediv">
                     <label htmlFor="addfile">
                    <i class="writeicon fas fa-plus"></i>
                    </label>
                    <input type="file" id="addfile" style={{display:"none"}} onChange={(e)=>{setfile(e.target.files[0])}}/>
                <input type="text"  className="titlesinglepost" autoFocus={true} ref={titleref} defaultValue={post.title} onChange={(e)=>{settitle(true)}}/>
                <div className="singlepostinfo">
            <span>Author: {post.username}</span>
            <span>{new Date(post.createdAt).toDateString()}</span>
            </div>
            <input type="text"  className="catsinglepost" autoFocus={true} defaultValue="" ref={catref} onChange={(e)=>{setcat(true)}} placeholder={"Add a category"}/>
                <textarea className="descsinglepost" defaultValue={post.desc} ref={descref} onChange={(e)=>{setdesc(true)}}></textarea>
            <button className="Updatebtn" onClick={handleedit}>Update</button>    
            </div>    
            )
            }  
            </div>
            <Sidebar/>
            
        </div>
        </>
    )
}

export default Singlepost
