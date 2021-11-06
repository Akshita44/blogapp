import React, { useEffect, useState } from 'react'
import homeimg from "./images/coast.jpg"
import "./Home.css"
import Post from './post';
import Sidebar from "./sidebar";
import axios from "axios"
import { useLocation } from 'react-router';
function Home() {
    const [posts,setposts]=useState([])
    const {search}=useLocation()
    useEffect(()=>{
        const getposts=async()=>{
            // console.log("Hellllooooooooo");
            const p=await axios.get(`/post/${search}`)
            console.log(p.data);
            // console.log("Hellllooooooooo");
            setposts(p.data)
        }
        getposts()
    },[search])
    console.log(posts);
    return (
        <div className="homepage">
            <div className="headertitle">
                <span className="headersm">React & Node</span>
                <span className="headerlg">BLOG</span>
            </div>
            <img src={"https://images.pexels.com/photos/6469/red-hands-woman-creative.jpg?auto=compress&cs=tinysrgb&dpr=2&w=500"} className="homeimg" alt="" />
            <div className="homeposts">
                <div className="homepost">
                    {posts.map((item)=>(
                         <Post post={item}/>
                    ))} 
                </div>
                <Sidebar></Sidebar>
            </div>

        </div>
    )
}

export default Home
