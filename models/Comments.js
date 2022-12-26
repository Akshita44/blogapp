const mongoose=require("mongoose")

const commentSchema= mongoose.Schema({
        comment:{
            type:String,
            required:true
        },
        userID:{
            type:mongoose.Schema.ObjectId,
            ref:"user",
            required:true
        },
        postID:{
            type:mongoose.Schema.ObjectId,
            ref:"post",
            required:true
        },
        username:{
            type:String,
            required:true
        },
        profilepic:{
            type:String,
            required:false
        },

    },
{ timestamps : true}
);

const Comments= new mongoose.model("comment",commentSchema);
module.exports=Comments
