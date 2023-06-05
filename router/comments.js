const express=require("express")
const router=new express.Router();
const Comments=require("../models/Comments");

router.post("/",async(req,res)=>{
    try{
        const {comment,createdBy,onpost}=req.body;
        if(!comment || !createdBy || !onpost)
        {
            throw new Error("Fill the credentials")
        }
        const data=new Comments(req.body);
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
    const d = await Comments.find().populate({path:"createdBy"});
    res.status(200).send(d);
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})

router.get("/postid/:id",async(req,res)=>{
    try{
    const d = await Comments.find({onpost:req.params.id}).populate({path:"createdBy"})
    res.status(200).send(d);
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})
router.delete("/delete/:id",async(req,res)=>{
    try{
        const c=await Comments.findById(req.params.id).populate({path:"createdBy"})
        if(c.createdBy._id.toString() === req.body.createdBy._id || req.body.role === "admin")
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