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
    fileimg:{
        type:String,
        required:false,
    },
    username:{
        type:String,
        required:true
    },
    categories:{
        type:Array,
        required:false
    },
},
{ timestamps : true}
);
const Posts= new mongoose.model("post",postSchema);
module.exports=Posts
