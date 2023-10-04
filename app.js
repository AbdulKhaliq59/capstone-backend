const express = require("express");
const postRoutes = require("./routes/post");
const commentRoute = require("./routes/comment");
const contactRoute = require("./routes/contact");
const authRoute = require('./routes/Auth')
const userRoute = require("./routes/user");
const updatePasswordRoute = require("./routes/profile");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Capstone project APIs documentation",
      version: "1.0.0",
      description: "This is the documentation for APIs capstone project",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: "https://capstone-backend-mzjj.onrender.com",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/updatePassword", updatePasswordRoute);
app.use("/posts", postRoutes, commentRoute);
app.use("/auth", authRoute);
app.use("/contact", contactRoute);
app.use("/users", userRoute);
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to my api" });
});
//exporting app.js
module.exports = app;
