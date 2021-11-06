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
const l=function(req, res, next) {
    req.getUrl = function() {
      const d= req.protocol + '://' + req.get('host') + req.originalUrl + "/images";
      console.log(d);
      return d
    }
const m=l()    
app.use("/images",m);
// app.use("/images",express.static(__dirname,"/images"))
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
app.post("/upload",upload.single("file"),(req,res)=>{
    res.status(200).send("file have been uploaded");
})
app.use("/auth",userrouter)
app.use("/post",postrouter)
app.use("/categories",categoryrouter)

if(process.env.NODE_ENV === "production")
{
    app.use(express.static("client/build"));
}
app.listen(port,()=>{
    console.log("Connected");
})