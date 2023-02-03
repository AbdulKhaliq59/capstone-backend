const app = require("./app");
const mongoose = require("mongoose");
require("dotenv/config");
const port = process.env.PORT || 3000;

// Create mongodb connection

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to Mongo DB");

    app.listen(port, () => console.log(`Server started on port ${port}`));
  });
