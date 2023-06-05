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
import baseUrl from './constant'
function Singlepost(props) {
    const[post,setpost]=useState({createdBy:""})
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
            try{

                setisLoading(true)
                const d=await axios.get(`/post/${id}`)
                setpost(d.data)

            }
            catch(err){
                console.log(err);
            }
            setisLoading(false)
        }
        getpost();
    },[id])

    useEffect(()=>{
        if(state.user)
        {
            setu(state.user.username)
        }
    },[state.user])
    

    useEffect(()=>{
        const data=async()=>{
            try{
                setisLoading(true)
                const d=await axios.get(`/comment/postid/${id}`)
                setcomments(d.data)
            }
            catch(err)
            {
                console.log(err);
            }
            setisLoading(false)
        }
        data();
    },[ifcomment])

    
    const handleedit=async(e)=>{
        e.preventDefault();
        setisLoading(true)
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
                t={...t,categories:catref.current.value}
                }
            catch{}
        }
        if(file)
        {
            if(post.photo)
            {
                const result = await axios.post(`/image/delete`,{filepath:post?.photo})
            }
            const formData = new FormData();
            const filename=Date.now()+file.name
            formData.append("name",filename)
            formData.append("image", file);
            const result = await axios.post(`/image/upload?folder=post`,formData)
            t.photo=result.data.url
        }
        const d=await axios.put(`/post/${id}`,t)
        setisLoading(false)
        alert("Post is Updated!!")
        history.push("/")
    }
    const handledelete=async(s,dict)=>{
        setisLoading(true)
        const d=await axios.delete(s,{data:dict})
        setisLoading(false)
        alert("Deleted successfully")
        history.push("/")
    }
    const handlecomment=async()=>{
        try{
        const t={comment,onpost:id,createdBy:state.user._id}
        const d=await axios.post(`/comment`,t)
        setifcomment(!ifcomment)
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
            <img src={file ? URL.createObjectURL(file):`${baseUrl}${post.photo}`} className="singlepostimg" alt="" />
            } 
            {!update ? (
                <>
                <h1 className="singleposttitle">
                {post.title}
                {state.user?.role === "admin" &&(
                    <div className="singlepostedit">
                    <i class="far fa-trash-alt" target="Delete post" onClick={()=>handledelete(`/post/delete/${id}`,{createdBy:post?.createdBy})}></i>
                    </div>
                )}
                {( state.user?.role !== "admin" && post && post?.createdBy && post?.createdBy?.username === state.user?.username) ?
                <div className="singlepostedit">
                <i class="far fa-edit" target="Edit post" onClick={(e)=>setupdate(true)}></i>
                <i class="far fa-trash-alt"  target="Delete post" onClick={()=>handledelete(`/post/delete/${id}`,{createdBy:post?.createdBy})}></i>
                </div>
                :(post.createdBy.username === u) &&(
                    <div className="singlepostedit">
                <i class="far fa-edit" target="Edit post" onClick={(e)=>setupdate(true)}></i>
                <i class="far fa-trash-alt" target="Delete post" onClick={()=>handledelete(`/post/delete/${id}`,{createdBy:post?.createdBy})}></i>
                </div>
                )}
            </h1>
                <div className="singlepostinfo">
            <Link to={`/?user=${post.createdBy?.username}`} className="link"><span>Author: {post?.createdBy?.username}</span></Link>
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
                    <span style={{marginRight:"10px"}}><img src={comment.createdBy?.profilepic? comment.createdBy?.profilepic : "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"} className="profileimg" alt="" />
                    </span>
                    <span>{comment.createdBy?.username}</span>
                        <div className="commentsinglepost">
                        {state.user && (state.user.username === comment.createdBy?.username || state.user?.role === "admin" || u)&&
                        <i class="far fa-trash-alt"  target="Delete comment" onClick={()=>handledelete(`/comment/delete/${comment._id}`,{createdBy:comment.createdBy})}></i>}
                        {state.user?.role === "admin" && comment.createdBy.username !== "admin" &&
                        <button className="delbtn" target="Delete User" onClick={()=>handledelete(`/auth/delete/${comment.createdBy?._id}`,{role:state.user.role})}>Delete User</button>}
                        </div>
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
            <span>Author: {post.createdBy.username}</span>
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
