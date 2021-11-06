require("dotenv").config();
const express=require("express")
const app=express();
const mongoose=require("mongoose")
const path=require("path")
const multer=require("multer")
const cookieparser=require("cookie-parser")
require("./db/conn");
app.use(express.json())
app.use(cookieparser())
app.use("/images",express.static(path.join(document.URL,"/images")))
// app.use(express.urlencoded({extended:false}));
const userrouter=require("./router/auth");
const postrouter=require("./router/posts");
const categoryrouter=require("./router/category")
const port= process.env.PORT || 8000

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
})

const upload=multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).send("file have been uploaded");
})
app.use("/api/auth",userrouter)
app.use("/api/post",postrouter)
app.use("/api/categories",categoryrouter)

if(process.env.NODE_ENV === "production")
{
    app.use(express.static("client/build"));
}
app.listen(port,()=>{
    console.log("Connected");
})