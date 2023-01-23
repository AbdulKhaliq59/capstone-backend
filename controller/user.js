const User= require('../models/user');

const createUser=async(req,res,next)=>{
    const user = new User({
        username:req.body.username,
        password:req.body.password
    });
    try {
        const saveUser= await user.save();
        req.user=saveUser;
        next();
    } catch{
        res.status(404);
        res.send({error:error.message});
    }
}


module.exports={
    createUser:createUser,
}