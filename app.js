const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./route/post");
const userRoutes = require("./route/user");
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
    app.use("/posts", postRoutes);
    app.use("/users", userRoutes);
    app.listen(3000, () => {
      console.log("Serve has started!");
    });
  });
