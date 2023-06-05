import React, { useEffect, useState } from 'react'
import "./sidebar.css"
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import {Link} from "react-router-dom"
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from '@mui/icons-material/Email';
function Sidebar() {
    const [cat,setcat]=useState([])
    useEffect(()=>{
        const data=async()=>{
        const d=await axios.get("/categories")
        setcat(d.data)
        // console.log(d.data);
    }
    data();
    },[])
    return (
        <div className="sidebar">
            <Accordion defaultActiveKey="1" flush>
            <Accordion.Item className="header" style={{border:"None"}}>
              <Accordion.Header className="sidespan1">CATEGORIES</Accordion.Header>
              <Accordion.Body style={{height:"300px",maxheight:"400px",overflow:"auto"}}>
              
                {cat.map((e)=>(
                  <div className="categories" key={e._id} style={{borderBottom:"1px solid rgba(0,0,0,0.2)",marginBottom:"0px"}}>
                <p><Link to={`/?cat=${e.name}`} className="link">{e.name[0].toUpperCase()+e.name.toLowerCase().slice(1)}</Link></p>
                </div>
             ))} 
              </Accordion.Body>    
            </Accordion.Item>
          </Accordion>
            <span className="sidespan">FOLLOW US</span>
            <div>
            <span><a
                href="https://www.linkedin.com/in/akshita-sharma-a60444220"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon fontSize="medium" className='icons' />
              </a></span>
            <span><a
                href="https://github.com/Akshita44"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon fontSize="medium" className='icons'/>
              </a></span>
            <span> <a
                href="https://www.instagram.com/akshitasharma407/"
                target="_blank"
                rel="noopener noreferrer">
                <InstagramIcon fontSize="medium" className='icons' />
              </a></span>
            <span> <a href="mailto:akshitasharma407@gmail.com">
                <EmailIcon fontSize="medium" className='icons' />
              </a></span>
            </div>
        </div>
    )
}

export default Sidebar
