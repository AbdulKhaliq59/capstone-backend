const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const User =require('../../models/user');
require("dotenv/config");

describe("Create a user", () => {
  let connection;

  beforeAll(async () => {
    mongoose.set("strictQuery", true);
    connection = await mongoose.connect(process.env.DB_CONNECTION);
    () => console.log("Connected to MongoDB");
  }, 20000);

  afterAll(async () => {
    mongoose.connection.once("open", async () => {
      await mongoose.connection.db.dropDatabase();
      await mongoose.disconnect();
      console.log("Disconnected from MongoDB and database dropped");
    });
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it("Should create return user created successfully and return 200", async () => {
    const user = {
      username: "test@gmail.com",
      password: "test1234",
    };
    const res = await request(app).post("/signup").send(user);
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "User created Successfully");
  });

  it("Should create return 400 created and user already exist", async () => {
    const user = {
      username: "khali124@gmail.com",
      password: "khaliq1234",
    };
    await request(app).post("/signup").send(user);
    const res = await request(app).post("/signup").send(user);
    console.log(res.body);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "User already registered");
  });
});
