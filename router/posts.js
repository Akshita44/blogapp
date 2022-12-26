const express=require("express")
const router=new express.Router();
// const bcryptjs=require("bcryptjs");
// const Users=require("../models/user");
const Posts=require("../models/post");

router.post("/",async(req,res)=>{
    try{
        // console.log(req.body);
        const {title,desc,username}=req.body;
        if(!username || !desc || !title )
        {
            console.log(username,desc,title);
            throw new Error("Fill the credentials")
        }
        const data=new Posts(req.body);
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

router.put("/:id",async(req,res)=>{
    try{
        const post=await Posts.findById(req.params.id)
        if(post.username === req.body.username)
        {
            const d=await Posts.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            console.log(d);
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
        console.log(req.params.id);
        const post=await Posts.findById(req.params.id)
        console.log(post);
        console.log("helllllllloooooooo",req.body.username);
        if(post.username === req.body.username || req.body.role === "admin")
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
    console.log(d);
    res.status(200).send(d.toString());
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})

router.get("/:id",async(req,res)=>{
    try{
    const d = await Posts.findById(req.params.id);
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
        // res.status(200).json(d);
        }
        if(user)
        {
            query= query.find({username:user});
        // res.status(200).json(d);

        }
        if(cat)
        {
        query= query.find({categories:{$in:[cat]}});
        // res.status(200).json(d);
        }
        // console.log("Hello");
        // console.log(query);
        const d = await query;
        // console.log(d);
        res.status(200).json(d);

        // res.status(200).json(d);
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})

module.exports=router