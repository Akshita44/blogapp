import React, { useContext, useEffect, useState} from 'react'
import "./Navbar.css"
import as from "./images/aks.jpg";
import {Link,useHistory} from "react-router-dom"
import {Context} from "./App"

function Navbar() {
    const {state,dispatch}=useContext(Context)
    const history=useHistory()
    console.log(state.loc);
    // const l=state.loc.split(":")
    // console.log(l)
    // console.log(l[0])
    // const PF="http:"+ l[0] + "images/";
    // console.log(PF);
    
    const PF=state.loc + "images/";
    const clear=async()=>{
            const res=await fetch("/auth/logout",{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            })
            console.log(res);
            if(res.status=== 200)
            {
                dispatch({
                    type:"Logout"
                })
                history.push("/login")
            }
    }
    return (
        <div className="navbar">
            <div className="navleft">
            <span><i class="navicon fab fa-facebook-square"></i></span>
            <span><i class="navicon fab fa-twitter-square"></i></span>
            <span><i class="navicon fab fa-pinterest-square"></i></span>
            <span><i class="navicon fab fa-instagram-square"></i></span>
            </div>
            <div className="navcenter">
                <ul className="navlist">
                   
                    
                    <li className="navlistitem"> <Link to="/" className="link">HOME</Link></li>
                    {/* <li className="navlistitem"><Link to="/about" className="link">ABOUT</Link></li> */}
                    
                    <li className="navlistitem"><Link to="/" className="link">BlOG</Link></li>
                    
                    
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
            <div className="navright">
                {state.user?.profilepic ?
               <Link to="/about"><img src={PF + state.user.profilepic} alt="" className="navimg"/></Link>:
               <Link to="/about"><img src="https://image.flaticon.com/icons/png/512/17/17004.png" alt="" className="navimg"/></Link>

                }
                <i class="fas fa-search"></i>            
            </div>
        </div>
    )
}

export default Navbar
