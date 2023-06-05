const express=require("express")
const router=new express.Router();
const Posts=require("../models/post");

router.post("/",async(req,res)=>{
    try{
        const {title,desc,createdBy}=req.body;
        if(!createdBy || !desc || !title )
        {
            throw new Error("Fill the credentials")
        }
        const data=new Posts(req.body);
        const d=await data.save();
        res.status(201).send(d);
    }
    catch(err)
    {
        console.log(err);
        res.status(400).send("Invalid credentials");
    }
})

router.put("/:id",async(req,res)=>{
    try{
        const post=await Posts.findById(req.params.id).populate({path:"createdBy",select:["_id"]})
        if(post.createdBy._id.toString() === req.body.createdBy._id)
        {
            const d=await Posts.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            res.status(200).send("Post is updated!!")
        }
        else{
            res.status(400).send("You can only update your own blog!");
        }
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})

router.delete("/delete/:id",async(req,res)=>{
    try{
        const post=await Posts.findById(req.params.id).populate({path:"createdBy",select:["_id"]})
        if(post.createdBy._id.toString() === req.body.createdBy._id || req.body.role === "admin")
        {
            await Posts.findByIdAndDelete(req.params.id);
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

router.get("/count",async(req,res)=>{
    try{
    const d = await Posts.countDocuments();
    res.status(200).send(d.toString());
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})

router.get("/:id",async(req,res)=>{
    try{
    const d = await Posts.findById(req.params.id).populate({path:"createdBy"});
    res.status(200).send(d);
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})


router.get("/",async(req,res)=>{
    const user= req.query.user
    const cat=req.query.cat
    const page=req.query.page
    var query=Posts.find()
   
    try{
        if(page)
        {
            const currentpage=Number(page) || 1;
            const skip=6 * (currentpage-1);
            query= query.limit(6).skip(skip);
        }
        if(user)
        {
            query= query.find().populate({path:"createdBy",select:["username"],match:{username:user}});

        }
        if(cat)
        {
        query= query.find({categories:{$in:[cat]}});
        }
        const d = await query;
        res.status(200).json(d);
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})

module.exports=router