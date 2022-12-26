const express=require("express")
const router=new express.Router();
const bcryptjs=require("bcryptjs");
const Users=require("../models/user");
const Posts=require("../models/post");
const authenticate=require("../middleware/authenticate");
// router.use(express.json())
router.get("/getdata",authenticate,(req,res)=>{
    res.status(200).send(req.user);
    console.log(req.user);
})
router.get("/logout",authenticate,async(req,res)=>{
    res.clearCookie("jwt");
    // req.user.tokens=req.user.tokens.filter((element)=>{
    //         return req.token !== element.token;
    // })
    // await req.user.save();
    res.status(200).send("user logged out");
})
router.post("/register",async(req,res)=>{
    try{
        console.log(req.body);
        const {username,email,password}=req.body;
        if(!username || !email || !password )
        {
            throw new Error("Fill the credentials")
        }
        const data=new Users(req.body);
        console.log(data);
            // const a=await Users.find({email:null})
            // console.log(a);
        console.log(".............");
        const d=await data.save();
                // console.log("hello world");
        console.log(d);
        res.status(201).send(d);
    }
    catch(err)
    {
        console.log(err);
        res.status(400).send("Invalid credentials");
    }
})

router.post("/login",async(req,res)=>{
    try{
        if(!req.body.email || !req.body.password)
        {
            throw new Error("Fill the credentials")
        }
        const data=await Users.findOne({email:req.body.email});
        // console.log(data);
        if(data)
        {
            const token=await data.getauthtoken();
            const match=await bcryptjs.compare(req.body.password,data.password);
            console.log(match);
            if(match)
            {
                res.cookie("jwt",token,{
                expires:new Date(Date.now()+86400000),
                httpOnly:true})
                res.status(201).send(data);
            }
            else{
                res.status(400).send("Invalid credentials");
            }
        }
        else{
            res.status(400).send("Invalid credentials");
        }
    }
    catch(err)
    {
        res.status(400).send(err);
    }
})
router.put("/update/:id",async(req,res)=>{
    try{
        if(req.params.id === req.body._id)
        {
            const u=await Users.findById(req.params.id)
            if(req.body.username)
            {
                try{
                const data=Posts.find({username:u.username})
                data.forEach(async(element) => {
                    element.username=req.body.username
                    await element.save();
                });
                }
                catch(e)
                {
                    console.log(e);
                }
            }
            if(req.body.password)
            {
            req.body.password = await bcryptjs.hash(req.body.password,12);
            console.log(req.body.password);
            }
            const d = await Users.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
            console.log(d);
            res.status(200).send(d)
        }
        else{
            res.status(400).send("You can only change your own details!!!");
        }
    }
    catch(e)
    {
        res.status(400).send(e);
    }
})
router.get("/:id",async(req,res)=>{
    try{
    const d = await Users.findById(req.params.id);
    // console.log(JSON.parse(d));
    res.status(200).send(d);
    }
    catch(e)
    {
        res.status(400).send(e)
    }

})
router.delete("/delete/:id",async(req,res)=>{
    try{
        if(req.body.role === "admin")
        {
            await Users.findByIdAndDelete(req.params.id);
            res.status(200).send("User is deleted!!")
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

module.exports=router;