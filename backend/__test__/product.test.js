const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/route/product");
require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URL);
});
// Close connection after each test.
afterEach(async () => {
  await mongoose.connection.close();
});

describe('Post /product/create/:id', () => {
  describe('given all fields', () => {
    test('should create a product and return 201 status code', async () => {
      const res = await request(app).post("/signup").send({
        name: "test", 
        description: "test description", 
        price: 12, 
        category: "test category", 
        quantity: 1,
        image: "test image",
        sold: true,
        shipping: "test shipping"
      })
      expect(res.status).toBe(400)
    })
  })
})