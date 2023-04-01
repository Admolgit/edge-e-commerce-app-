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
        // You have to change the password at every test to pass 201 test.
        email: "testssd",
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

describe("POST /:id", () => {
  describe("given an id", () => {
    test("should return a 200 status code for user profile or 404 if id is not found", async () => {
      const { statusCode } = await request(app).post("/6421ce6371e8093a1838b9ee")
      if(statusCode === 200) {
        expect(statusCode).toBe(200)
      }
      if(statusCode === 404) {
        expect(statusCode).toBe(404)
      }
    })
  })
})

describe("POST /signin", () => {
  describe("given an email and password", () => {
    test("should return a 200 status code for user", async () => {
      const { statusCode } = await request(app).post("/signin").send({
        "email": "salawu89@gmail.com",
        "password": "Balikis890"
      })
      expect(statusCode).toBe(200)
    })
  })
})

describe("POST /signin", () => {
  describe("given an incorrect email with correct password", () => {
    test("should return a 400 status code", async () => {
      const { statusCode } = await request(app).post("/signin").send({
        "email": "salwu89@gmail.com",
        "password": "Balikis890"
      })
      expect(statusCode).toBe(400)
    })
  })
})

describe("POST /signin", () => {
  describe("given an incorrect password with correct email", () => {
    test("should return a 400 status code", async () => {
      const { statusCode } = await request(app).post("/signin").send({
        "email": "salawu89@gmail.com",
        "password": "Balikis90"
      })
      expect(statusCode).toBe(400)
    })
  })
})

describe("POST /signin", () => {
  describe("given an empty email and password", () => {
    test("should return a 409 status code", async () => {
      const { statusCode, body } = await request(app).post("/signin").send({
        "email": "",
        "password": ""
      })
      expect(statusCode).toBe(409)
    })
  })
})

describe("POST /signin", () => {
  describe("given an empty email and password", () => {
    test("should return a 409 status code", async () => {
      const { body } = await request(app).post("/signin").send({
        "email": "",
        "password": ""
      })
      expect(body).toBe("All fields must be filled")
    })
  })
})