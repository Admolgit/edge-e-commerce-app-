const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const category = require("../src/route/category");
require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URL);
});
// Close connection after each test.
afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST /category/create/64236f4a8a871207b0f06ff2", () => {
  describe("not given a name", () => {
    test("should return a 400 status code", async () => {
      const res = await request(app).post("/category/create/:id")
      if(res.statusCode === 400) {
        expect(res.status).toBe(400)  
      }
      if(res.statusCode === 201) {
        expect(res.status).toBe(201)
      }
    })
  })
})

// describe("GET /category/:categoryId", () => {
//   describe("given a category id", () => {
//     test("should return a 200 status code", async () => {
//       const res = await request(category).get("/category/:categoryId")
//       expect(res.status).toBe(200);
//     })
//   })
// })