const mongoose= require('mongoose');
const schema=mongoose.Schema({
    fullName:String,
    email:String,
    content:String
});
module.exports=mongoose.model("Contact",schema);
