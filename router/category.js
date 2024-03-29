const express=require("express")
const router=new express.Router();
const Category= require("../models/categories")

router.post("/",async(req,res)=>{
    try{
        const a=await Category.find({name:req.body.name})
        if(a.length === 0)
        {
            const d=new Category(req.body)
            const data=await d.save();
           res.status(200).send(data)
        }
        else{
            res.status(200).send("Already exists");
        }
    }
    catch(e)
    {
        res.status(400).send(e);
    }
})

router.get("/",async(req,res)=>{
    try{
        const data=await Category.find();
        res.status(200).send(data)
    }
    catch(e)
    {
        res.status(400).send(e);
    }
})

module.exports=router