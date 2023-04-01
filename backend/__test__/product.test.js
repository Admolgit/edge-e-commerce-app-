const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const createProduct = require("../src/controllers/product")
require("dotenv").config();

const userId = new mongoose.Types.ObjectId().toString();
const objectId = new mongoose.Types.ObjectId().toString();

const productPayload = {
  user: userId,
  name: "Product",
  description: "Product description",
  price: 10,
  category: objectId,
  quantity: 10,
  image: "image",
  sold: false,
  shipping: false,
};

/* Connecting to the database before each test. */
beforeEach(async () => {
  mongoose.connect(process.env.MONGODB_URL);
});
// Close connection after each test.
afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET /product/:productId", () => {
  describe("given the product does exist", () => {
    test("should return a 200", async () => {
      const { statusCode } = await request(app).get(
        `/product/${"6423f23dd6e2eb5c3c1ffdc1"}`
      );
      expect(statusCode).toBe(200);
    });
  });
});

describe("GET /product/:productId", () => {
  describe("given the product does not exist", () => {
    test("should return a 400", async () => {
      const { statusCode } = await request(app).get(
        `/product/${"6423f23qd6e2eb5c3c1ffdc1"}`
      );
      expect(statusCode).toBe(400);
    });
  });
});

describe("POST /product/create/:id", () => {
 describe("given the user id was not found", () => {
    test("should return a 400 status", async () => {

      const { statusCode } = await request(app).post(
        `/product/create/${"64236f4a8a871207b0f06f2"}`
      );
      expect(statusCode).toBe(400);
    });
  });
});

// describe("POST /product/create/:id", () => {
//  describe("given the user id was found", () => {
//     test("should return a 201 status", async () => {

//       const { statusCode } = await request(app).post(
//         `/product/create/${"64236f4a8a871207b0f06ff2"}`
//       ).send(productPayload);
//       expect(statusCode).toBe(201);
//     });
//   });
// });
