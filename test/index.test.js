const request = require('supertest');
const app = require('../app');
describe("Home route",()=>{
  it("Should return 200 if Home found",async()=>{
    const res=await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message","Welcome to my api");
  });
});
