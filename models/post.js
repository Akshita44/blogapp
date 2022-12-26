const mongoose=require("mongoose")
const bcryptjs=require("bcryptjs");

const postSchema= mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
        required:false,
    },
    username:{
        type:String,
        required:true
    },
    categories:{
        type:String,
        required:false
    },
},
{ timestamps : true}
);
postSchema.methods.addcomments=async function(item){
    try{
        this.comments=this.comments.concat(item);
        await this.save();
        return this.comments;
    }
    catch(err)
    {
        console.log(err);
    }
}
const Posts= new mongoose.model("post",postSchema);
module.exports=Posts
