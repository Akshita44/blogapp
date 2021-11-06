const mongoose= require("mongoose");
const Categoryschema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
},
{timestamps :true}
)

const Categories = new mongoose.model("category",Categoryschema);
module.exports=Categories;