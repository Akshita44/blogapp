const mongoose=require("mongoose")

const commentSchema= mongoose.Schema({
        comment:{
            type:String,
            required:true
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
        onpost:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"post",
            required:true
        },
        // username:{
        //     type:String,
        //     required:true
        // },
        // profilepic:{
        //     type:String,
        //     required:false
        // },

    },
{ timestamps : true}
);

const Comments= new mongoose.model("comment",commentSchema);
module.exports=Comments
