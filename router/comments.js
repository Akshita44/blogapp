const express=require("express")
const router=new express.Router();
const Comments=require("../models/Comments");

router.post("/",async(req,res)=>{
    try{
        console.log(req.body);
        const {comment,username,userID,postID}=req.body;
        if(!username || !comment || !userID || !postID)
        {
            throw new Error("Fill the credentials")
        }
        const data=new Comments(req.body);
        console.log(data);
        const d=await data.save();
        res.status(201).send(d);
    }
    catch(err)
    {
        console.log(err);
        res.status(400).send("Invalid credentials");
    }
})
router.get("/",async(req,res)=>{
    try{
    const d = await Comments.find();
    res.status(200).send(d);
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})

router.get("/postid/:id",async(req,res)=>{
    try{
    const d = await Comments.find({postID:req.params.id});
    res.status(200).send(d);
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})

router.put("/userid/:id",async(req,res)=>{
    try{
        var t={}
        console.log(req.body);
        if(req.body.username)
        {
            t.username=req.body.username
        }
        if(req.body.profilepic)
        {
            t.profilepic=req.body.profilepic
        }
        console.log("hellooo",t);
    const data=await Comments.updateMany({userID:req.params.id},{$set:t});
    res.status(201).send(data);
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})
router.delete("/delete/:id",async(req,res)=>{
    try{
        console.log(req.params.id);
        const c=await Comments.findById(req.params.id)
        console.log(req.body.username);
        if(c.username === req.body.username || req.body.role === "admin")
        {
            await Comments.findByIdAndDelete(req.params.id);
            res.status(200).send("Post is deleted!!")
        }
        else{
            res.status(400).send("You can only delete your own account!!!");
        }
    }
    catch(e)
    {
        res.status(400).send(e);
    }
})
module.exports=router