const jwt=require("jsonwebtoken");
const Users=require("../models/user");

const authenticate=async function(req,res,next){
    try{
        const token=req.cookies.jwt;
        const verify=jwt.verify(token,process.env.SECRET_KEY);
        console.log(verify);
        const data= await Users.findOne({_id:verify._id});
        console.log(data);
        req.user=data;
        req.token=token
        next();
    }
    catch(err)
    {
        res.status(400).send(err);
    }
}

module.exports=authenticate;