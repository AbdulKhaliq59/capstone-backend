const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const User = require("../../models/user");

describe("Login user", () => {
  let connection;
  beforeAll(async () => {
    await mongoose.set("strictQuery", true);
    connection = await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB");
  }, 20000);
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
    console.log("Disconnected from mongoDB and database dropped");
  });
  afterEach(async () => {
    User.deleteMany({});
  });
  it("should return 'Welcome [username]' and return success status with token", async () => {
    await request(app).post("/signup").send({
      username: "khali124@gmail.com",
      password: "khaliq1234",
    });
    const res = await request(app).post("/signin").send({
      username: "khali124@gmail.com",
      password: "khaliq1234",
    });
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "welcome khali124@gmail.com");
    expect(res.body).toHaveProperty("data");
  });
  it("Should return 'Password is wrong' and return 400", async () => {
    await request(app).post("/signup").send({
      username: "khali124@gmail.com",
      password: "khaliq1234",
    });
    const res = await request(app).post("/signin").send({
      username: "khali124@gmail.com",
      password: "random_password",
    });
    console.log(res.body);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "Password is wrong");
  });
});
