const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./routes/post");
const signupRoutes = require("./routes/signup");
const signinRoutes =require('./routes/signin');
const commentRoute=require('./routes/comment');
require('dotenv/config');


mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
  .then(() => {
    const app = express();
    app.use(express.json());
    app.get("/", (req, res) => {
      res.send("This is The home page");
    });
    app.use("/posts", postRoutes,commentRoute);
    app.use("/signup", signupRoutes);
    app.use("/signin", signinRoutes);
    app.listen(3000, () => {
      console.log("Serve has started!");
    });
  });
