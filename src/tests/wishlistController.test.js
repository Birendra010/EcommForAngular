const request = require("supertest");
const server = require("../index");

let token;

beforeEach(async () => {
  await server.close();
});
afterEach(async () => {
  await server.close();
});

describe("wishList api", () => {
  // store token
  it("should return 200 if user login seccessfully  ", async () => {
    const response = await request(server).post("/login").send({
      password: "123456",
      email: "invailidemail@gmail.com",
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("login seccessfully");
    token = response.body.token;
  }, 8000);
});

// create wishlist
describe(" craete wishlist Api ", () => {
  // if teken not present in header
  it("should return 401 if token is not present in header", async () => {
    const response = await request(server).post("/wishlist").send({}).set({});
    expect(response.status).toBe(401);
  });

  // if invalid productId
  it("should return 400 if invalid productId", async () => {
    const response = await request(server)
      .post("/wishlist")
      .send({ productId: "65113885ebf4076b07" })
      .set({ "x-api-key": token });

    expect(response.status).toBe(400);
  });

  // when product not found with given  productId
  it("should return 404 if product not found with given productId", async () => {
    const response = await request(server)
      .post("/wishlist")
      .send({ productId: "64c77eeacce3b1afb1c5b7e8" })
      .set({ "x-api-key": token });
    expect(response.status).toBe(404);
  });

  // when product added to wishlist seccussfully
  it("should return 201 if product added seccussfully in wishlist", async () => {
    const response = await request(server)
      .post("/wishlist")
      .send({ productId: "65113885ebf4076b07976267" })
      .set({ "x-api-key": token });
    expect(response.status).toBe(201);
  });

  // when product  wishlist already in your wishlist
  it("should return 400 if product is already in your wishlist", async () => {
    const response = await request(server)
      .post("/wishlist")
      .send({ productId: "65113885ebf4076b07976267" })
      .set({ "x-api-key": token });
    expect(response.status).toBe(400);
  });
});



/// Remove items in wishlist
describe(" remove item in  wishlist Api ", () => {
  // if teken not present in header
  it("should return 401 if token is not present in header", async () => {
    const response = await request(server).put("/wishlist").send({}).set({});
    expect(response.status).toBe(401);
  });

  // remove item from wishlist
  it("should return 400 if product is already in your wishlist", async () => {
    const response = await request(server)
      .put("/wishlist")
      .send({ productId: "65113885ebf4076b07976267" })
      .set({ "x-api-key": token });
    expect(response.status).toBe(200);
  });
});
