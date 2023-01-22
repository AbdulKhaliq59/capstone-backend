const express=require('express');
const mongoose=require('mongoose');
const postRoutes=require('./route/post');
const userRoutes=require('./route/user');
mongoose.set("strictQuery",true);
mongoose.connect('mongodb+srv://test:test@cluster0.60obzfg.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser:true})
.then(()=>{
    const app=express();
    app.use(express.json());
    app.get('/',(req,res)=>{
        res.send("This is The home page");
    })
    app.use('/posts',postRoutes);
    app.use('/users',userRoutes);
    app.listen(3000,()=>{
        console.log("Serve has started!");
    })
})
