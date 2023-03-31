const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/route/product");
require("dotenv").config();

const userId = new mongoose.Types.ObjectId().toString();
const objectId = new mongoose.Types.ObjectId().toString();

const productPayload = {
  user: userId,
  name: 'Product',
  description: 'Product description',
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

// describe('Post /product/create/:id', () => {
//   describe('given all fields', () => {
//     test('should create a product and return 201 status code', async () => {
//       const res = await request(app).post("/signup").send({
//         name: "test", 
//         description: "test description", 
//         price: 12, 
//         category: "test category", 
//         quantity: 1,
//         image: "test image",
//         sold: true,
//         shipping: "test shipping"
//       })
//       expect(res.status).toBe(400)
//     })
//   })
// })

describe("get product route", () => {
  describe("given the product does not exist", () => {
    test("should return a 404", async () => {
      const productId = "product-123";

      await request(app).get(`/product/${productId}`).expect(404);
    });
  });

  // describe("given the product does exist", () => {
  //   it("should return a 200 status and the product", async () => {
  //     // @ts-ignore
  //     const product = await createProduct(productPayload);

  //     const { body, statusCode } = await supertest(app).get(
  //       `/api/products/${product.productId}`
  //     );

  //     expect(statusCode).toBe(200);

  //     expect(body.productId).toBe(product.productId);
  //   });
  // });
});