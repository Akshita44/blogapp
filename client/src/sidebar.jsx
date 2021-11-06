import React, { useEffect, useState } from 'react'
import "./sidebar.css"
import girl from "./images/girl.jpg";
import axios from 'axios';
import {Link} from "react-router-dom"
function Sidebar() {
    const [cat,setcat]=useState([])
    useEffect(()=>{
        const data=async()=>{
        const d=await axios.get("/categories")
        setcat(d.data)
        console.log(d.data);
    }
    data();
    },[])
    return (
        <div className="sidebar">
            <span className="sidetitle">ABOUT ME</span>
            <img src={girl}  className="sideimg" alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis perspiciatis nostrum possimus vitae quaerat 
            deleniti iure nisi error quas</p>
            <span className="sidespan" style={{width:"60%"}}>CATEGORIES</span>
            <ul className="categories">
                {cat.map((e)=>(
                <li className="categoriesitem"><Link to={`/?cat=${e.name}`} className="link">{e.name[0].toUpperCase()+e.name.toLowerCase().slice(1)}</Link></li>
             ))} 
            </ul>
            <span className="sidespan">FOLLOW US</span>
            <div>
            <span><i class="navicon fab fa-facebook-square"></i></span>
            <span><i class="navicon fab fa-twitter-square"></i></span>
            <span><i class="navicon fab fa-pinterest-square"></i></span>
            <span><i class="navicon fab fa-instagram-square"></i></span>
            </div>
        </div>
    )
}

export default Sidebar
