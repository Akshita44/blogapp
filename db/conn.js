require("dotenv").config()
const mongoose=require("mongoose");
mongoose.connect(process.env.DATABASE).then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log(err);

});