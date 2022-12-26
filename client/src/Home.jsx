import React, { useContext, useEffect, useState } from 'react'
import "./Home.css"
import Post from './post';
import Sidebar from "./sidebar";
import axios from "axios"
import { useLocation } from 'react-router';
import Pagination from "react-js-pagination"
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import Loader from './Loader';
import { Context } from './App';
function Home() {
    const [posts,setposts]=useState([])
    const {isLoading,setisLoading}=useContext(Context)
    const {search}=useLocation()
    const [currentPage,setcurrentpage]=useState(1);
    const [searchPage,setsearchpage]=useState(1);
    const [productsCount,setproductsCount]=useState();
    useEffect(()=>{
        const getcount=async()=>{
            const p=await axios.get(`/post/count`)
            // console.log(p.data);
            setproductsCount(p.data)
        }
        getcount()
    },[])
    useEffect(()=>{
        const getposts=async()=>{
            console.log(search);
            setisLoading(true)
            if(search)
            {
                const p=await axios.get(`/post/${search}&page=${searchPage}`)
                // console.log(p.data);
                setposts(p.data)
            }
            else{
                const p=await axios.get(`/post/?page=${currentPage}`)
                // console.log(p.data);
                setposts(p.data)
            }
            setisLoading(false)
        }      
        getposts()
    },[search,currentPage])
    const setCurrentPageNo=(e)=>{
        if(search)
        {
            setsearchpage(e)
        }
        else{
            setcurrentpage(e)
        }
    }
    const list=["Image1.jpg","Image2.jpg","Image3.jpg","Image4.jpeg","Image5.webp","Image6.jpeg"]
    console.log(posts);
    const resultperpage=6;
    return (
        <>
        {isLoading && <Loader></Loader>}
        <div className="homepage">
            <div>
                <Carousel>
                    {list.map((item)=>(
                            <Carousel.Item interval={1500}>
                                <img
                                className="d-block w-100 homeimg"
                                src={`./images/${item}`}alt="Image One"
                            />
                            </Carousel.Item>
                    ))}
                </Carousel>
            </div>
            <div className="headertitle">
                <span className="headerlg">BLOG</span>
                <p style={{fontSize:"80px",marginTop:"0px"}}>Express Yourself...</p>
            </div>
            <div className="homeposts">
                {posts.length?(<div className="homepost">
                    {posts.map((item)=>(
                         <Post post={item}/>
                    ))} 
                </div>):(<div className="homepost">
                    <h1 style={{textAlign:"center",marginTop:"10px"}}>No blogs yet!!</h1>
                </div>)}
                
                
                <Sidebar></Sidebar>
            </div>
            {resultperpage < productsCount && <div className='paginationBox'>
                    <Pagination activePage={currentPage} 
                    itemsCountPerPage={resultperpage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="next"
                    prevPageText="prev"
                    firstPageText="1st"
                    LastPageText="last"
                    itemClass='page-item'
                    linkClass='page-link'
                    activeClass='pageitemActive'
                    activeLinkClass='pageLinkActive'></Pagination>
                </div>}
        </div>
        </>
    )
}

export default Home
