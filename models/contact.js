const mongoose= require('mongoose');
const schema=mongoose.Schema({
    fullName:String,
    email:String,
    feedback:String
});
module.exports=mongoose.model("contact",schema);
