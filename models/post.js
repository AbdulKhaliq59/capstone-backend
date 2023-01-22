const mongoose=require('mongoose');
const schema=mongoose.Schema({
    title:String,
    description:String,
    imageUrl:String,
})
module.exports=mongoose.model("Post",schema);