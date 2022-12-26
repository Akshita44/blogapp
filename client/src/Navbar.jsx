import React, { useContext, useEffect, useRef, useState} from 'react'
import "./Navbar.css"
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from '@mui/icons-material/Email';
import {Link,useHistory} from "react-router-dom"
import axios from 'axios';
import {Context} from "./App"
import Loader from './Loader'
import NavDropdown from 'react-bootstrap/NavDropdown'

function Navbar() {
    const {state,dispatch,isLoading,setisLoading}=useContext(Context)
    const history=useHistory()
    console.log(typeof(state.loc));
    console.log(state.loc?.split(":"));
    const [cat,setcat]=useState([])
    useEffect(()=>{
        const data=async()=>{
        const d=await axios.get("/categories")
        setcat(d.data)
        console.log(d.data);
    }
    data();
    },[])
    const clear=async()=>{
        setisLoading(true)
            const res=await fetch("/auth/logout",{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            })
            console.log(res);
        setisLoading(false)
            if(res.status=== 200)
            {
                dispatch({
                    type:"Logout"
                })
                history.push("/login")
            }
    }

    return (
        <>
        {isLoading && <Loader></Loader>}
       
        <div className="navbar">
            <div className="navleft">
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
            <div className="navcenter">
                <ul className="navlist">
                {/* <li className="navlistitem icon" onClick={respfunc}><i class="fa fa-bars"></i></li> */}
                    
                    <li className="navlistitem"> <Link to="/" className="link">HOME</Link></li>
                    {/* <li className="navlistitem"><Link to="/about" className="link">ABOUT</Link></li> */}
                    
                    <li className="navlistitem">{state.user? (<Link to={`/?user=${state.user.username}`} className="link">BlOG</Link>):(<Link to="/" className="link">BlOG</Link>)}</li>
                    
                    
                    <li className="navlistitem">{state.user ?(<Link to="/write" className="link">WRITE</Link>):(
                        <Link to="/login" className="link">WRITE</Link>
                    )}</li>
                    
                    {state.user ? (
                        <li className="navlistitem" onClick={clear}><Link to="/login" className="link">LOGOUT</Link></li>
                        ):(
                            <>
                            <li className="navlistitem"><Link to="/login" className="link">LOGIN</Link></li>
                    <li className="navlistitem"><Link to="/register" className="link">REGISTER </Link></li>
                   </>

             ) }
                    
                </ul>
            </div>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Dropdown"
              menuVariant="dark"
            >
              {cat.map((e)=>(
                    <NavDropdown.Item href={`/?cat=${e.name}`}>{e.name[0].toUpperCase()+e.name.toLowerCase().slice(1)}</NavDropdown.Item>
                ))}
            </NavDropdown>

            <div className="navright">
                {state.user?.profilepic ?
               <Link to="/about"><img src={state.user.profilepic} alt="" className="navimg"/></Link>:
               <Link to="/about"><i className="fa-solid fa-user-large navicon"></i></Link>

                }
                           
            </div>
        </div>
        </>
    )
}

export default Navbar
