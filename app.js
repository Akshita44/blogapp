require("dotenv").config({path: __dirname+'/.env'});
const express=require("express")
const app=express();
const mongoose=require("mongoose")
const path=require("path")
const cookieparser=require("cookie-parser")
require("./db/conn");
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.json())
app.use(cookieparser())  
app.use("/images",express.static(path.join(__dirname,"/images")))
// app.use(express.urlencoded({extended:false}));
const userrouter=require("./router/auth");
const postrouter=require("./router/posts");
const categoryrouter=require("./router/category")
const commentsrouter=require("./router/comments")
const port= process.env.PORT || 8000

app.use("/auth",userrouter)
app.use("/post",postrouter)
app.use("/categories",categoryrouter)
app.use("/comment",commentsrouter)

// if(process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod")
// {
    app.use(express.static(path.join(__dirname,"./client/build")));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"./client/build/index.html"),
        function(err)
        {
            res.status(500).send(err);
        }
        )
    })
// }
app.listen(port,()=>{
    console.log("Connected");
})