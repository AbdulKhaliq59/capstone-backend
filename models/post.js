const mongoose=require('mongoose');
const schema=mongoose.Schema({
    title:String,
    description:String,
    imageUrl:String,
    comments: [
        {
          username: {
            type: String,
          },
          comment: {
            type: String,
          },
        },
      ],
});

module.exports=mongoose.model("Post",schema);