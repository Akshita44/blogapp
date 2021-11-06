const mongoose=require("mongoose")
const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken")

const userSchema= mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profilepic:{
        type:String,
        default:"",
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }

        }
    ]
},
{timestamps:true}
);

userSchema.methods.getauthtoken=async function(){
    try{
        const token=await jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token});
        await this.save();
        return token
    }
    catch(err)
    {
        console.log(err);
    }
}
    
userSchema.pre("save",async function(next){
    if(this.isModified("password"))
    {
        this.password=await bcryptjs.hash(this.password,12)
    }
    next();
})
const Users=new mongoose.model("user",userSchema);
module.exports= Users
