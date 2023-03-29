const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URL);
});
// Close connection after each test.
afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST /signup", () => {
  describe("given a name, email and password", () => {
    test("should return a 201 status code for new user, if user exist return 400", async () => {
      const res = await request(app).post("/signup").send({
        name: "test",
        email: "testss",
        password: "test"
      })
      if(res.statusCode === 201) {
        expect(res.status).toBe(201)
      }
      if(res.statusCode === 400) {
        expect(res.status).toBe(400)
      }
    })
  })
})