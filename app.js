const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./routes/post");
const signupRoutes = require("./routes/signup");
const signinRoutes = require("./routes/signin");
const commentRoute = require("./routes/comment");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
require("dotenv/config");

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
  .then(() => {
    const app = express();
    app.use(express.json());

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
            url: "http://localhost:3000",
          },
        ],
      },
      apis: ["./routes/*.js"],
    };

    const specs = swaggerJsDoc(options);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
    app.get("/", (req, res) => {
      res.send("This is The home page");
    });
    app.use("/posts", postRoutes, commentRoute);
    app.use("/signup", signupRoutes);
    app.use("/signin", signinRoutes);
    app.listen(3000, () => {
      console.log("Serve has started!");
    });
  });
