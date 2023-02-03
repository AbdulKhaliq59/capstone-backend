const app = require("../../app");
const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Post = require("../../models/post");

require("dotenv/config");
//function to generate token
// const generateToken = (payload) => {
//   return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1h" });
// };

describe("CRUD for posts", () => {
  let connection;
  beforeAll(async () => {
    mongoose.set("strictQuery", true);
    connection = await mongoose.connect(process.env.DB_CONNECTION);
    () => console.log("Connected to mongodb");
  }, 20000);

  //Creating Post
  describe("Creating a post", () => {
    it("Should return 201 if post created successfully", async () => {
      const post = {
        title: "Title for testing",
        description: "Description of the post in testing",
        imageUrl: "https://images.app.goo.gl/zviQwVrTb8SfUSn89image/url",
      };
      const res = await request(app).post("/posts").send(post);
      console.log(res.body);
      expect(res.status).toBe(201);
    });
  });

  //Retrieving all Posts
  describe("Return all post", () => {
    it("Should return all posts", async () => {
      const res = await request(app).get("/posts");
      expect(res.status).toBe(201);
    });
  });

  //Retrieving single post

});
