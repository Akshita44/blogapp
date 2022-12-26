import React  from 'react'
import "./post.css"
import {Link} from "react-router-dom"
function Post(props) {
    return (
        <div className="post">
            {props.post.photo &&
                     <Link to={`/singlepost/:${props.post._id}`}><img src={props.post.photo} 
                     className="postimg" alt="" /></Link>
            }
            <div className="postinfo">
            <div className="postcats">
                {props.post.categories && Array.isArray(props.post.categories)?(props.post.categories.map((e)=>(
                <span className="postcat">{props.post.categories}</span>
                ))):(<span className="postcat">{props.post.categories}</span>) }
            </div>
            <span className="posttitle"><Link to={`/singlepost/:${props.post._id}`} className="link">{props.post.title}</Link></span>
            <p className="postdate">{new Date(props.post.createdAt).toDateString()}</p>
            </div>
            <p className="postdesc">{props.post.desc}</p>

        </div>
    )
}

export default Post
