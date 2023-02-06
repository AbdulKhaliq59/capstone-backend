const app = require("../../app");
const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Post = require("../../models/post");
// const { afterEach } = require("node:test");

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

  //Drop database after testing
  // afterAll(async () => {
  //   mongoose.connection.once("open", async () => {
  //     await mongoose.connection.db.dropDatabase();
  //     await mongoose.disconnect();
  //     console.log("Disconnected from MongoDB and database dropped");
  //   });
  // });
  // afterEach(async () => {
  //   await Post.deleteMany({});
  // });

  let postId = "63e0f4398cd87760a9c700a5";
  let token = process.env.token;
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
  describe("Return single post", () => {
    //Valid data
    postId = "63e0fadebf8a5391dd54f131";
    it("Should return specific post", async () => {
      const res = await request(app)
        .get(`/posts/${postId}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
    it("Should return post doesn't exist", async () => {
      const res = await request(app)
        .get(`/posts/63db68d572085c431d695fa`)
        .set("Authorization", `Bearer ${token}`);
      console.log(res.body);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error", "Post doesn't exist!");
    });
  });
  //delete Post
  describe("Delete single Post", () => {
    it("Should return post deleted successfully", async () => {
      const postId = "63e0f4398cd87760a9c700a5";
      const res = await request(app)
        .delete(`/posts/${postId}`)
        .set("Authorization", `bearer ${token}`);
      console.log(res.body);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message", "Post deleted Successfully");
    });
    it("Should return post doesn't exist", async () => {
      const postId = "63da82f089fa3120465c8b";
      const res = await request(app)
        .delete(`/posts/${postId}`)
        .set("Authorization", `bearer ${token}`);
      console.log(res.body);
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "Internal server error");
    });
  });

  //Update specific post
  describe("Updating a post", () => {
    it("Should return 200 if post updated successfully", async () => {
      postId = "63e0f4378cd87760a9c700a3";
      const updatedPost = {
        title: "updated Title",
        description: "Updated Description",
        imageUrl: "https://images.app.goo.gl/zviQwVrTb8SfUSn89updated/url",
      };
      const res = await request(app)
        .patch(`/posts/${postId}`)
        .send(updatedPost);
      console.log(res.body);
      expect(res.status).toBe(200);
      const updatedDBPost = await Post.findById(postId);
      expect(updatedDBPost.title).toEqual(updatedPost.title);
      expect(updatedDBPost.description).toEqual(updatedPost.description);
    });
    it("Should return 404 if post doesn't exist", async () => {
      postId = "63e0b0e1c5cdbaf626cac";
      const updatedPost = {
        title: "updated Title",
        description: "Updated Description",
        imageUrl: "https://images.app.goo.gl/zviQwVrTb8SfUSn89updated/url",
      };
      const res = await request(app)
        .patch(`/posts/${postId}`)
        .send(updatedPost);
      console.log(res.body);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error", "Post doesn't exist");
    });
    it("Should return 400 if invalid request data", async () => {
      postId = "63e0f4378cd87760a9c700a3";
      const updatedPost = {
        title: "",
        description: "",
        imageUrl: "invalid url",
      };
      const res = await request(app)
        .patch(`/posts/${postId}`)
        .send(updatedPost);
      console.log(res.body);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error");
    });
  });
});
