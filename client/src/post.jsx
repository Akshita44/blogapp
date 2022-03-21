import React, { useContext } from 'react'
import "./post.css"
import {Link} from "react-router-dom"
import {Context} from "./App"
function Post(props) {
    const {state}=useContext(Context)
    console.log(props.post._id);
    // const l=state.loc.split(":")
    // const PF="http:"+l[0] + "images/";
    // const PF=state.loc+"images/"
    const PF="http:"+state.loc?.split(":")[1] + "images/";
    return (
        <div className="post">
            {props.post.photo &&
                     <Link to={`/singlepost/:${props.post._id}`}><img src={props.post.fileimg ? props.post.fileimg : PF + props.post.photo || props.post.photo} 
                     className="postimg" alt="" /></Link>
            }
            <div className="postinfo">
            <div className="postcats">
                {props.post.categories.map((e)=>(
                <span className="postcat">{e}</span>
                ))}
            </div>
            <span className="posttitle"><Link to={`/singlepost/:${props.post._id}`} className="link">{props.post.title}</Link></span>
            <p className="postdate">{new Date(props.post.createdAt).toDateString()}</p>
            </div>
            <p className="postdesc">{props.post.desc}</p>

        </div>
    )
}

export default Post
