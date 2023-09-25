const request = require("supertest");
const server = require("../index");
let cart;
let token;

beforeEach(async () => {
  await server.close();
});
afterEach(async () => {
  await server.close();
});

describe("cart api", () => {
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

describe("create cart api", () => {
  // if token not present in header
  it("should return 401 if token is not present in header", async () => {
    const response = await request(server).post("/cart").send({}).set({});
    expect(response.status).toBe(401);
  });

  // if request body is empty
  it("should return 400 if invailid requrest body", async () => {
    cart = await request(server)
      .post("/cart")
      .send({})
      .set({ "x-api-key": token });
    expect(cart.status).toBe(400);
    expect(cart.body).toEqual(
      expect.objectContaining({
        message: "please provide request body",
        status: false,
      })
    );
  });

  //if productId is empty
  it("should return 400  if productId is invalid", async () => {
    const response = await request(server)
      .post("/cart")
      .send({
        productId: "64c77eeacce3b1afb1c5b7",
      })
      .set({ "x-api-key": token });
    expect(response.status).toBe(400);
  });

  //if product not found this productId
  it("should return 404  if product not found with given Id", async () => {
    const response = await request(server)
      .post("/cart")
      .send({
        productId: "64c77eeacce3b1afb1c5b7e4",
      })
      .set({ "x-api-key": token });
    expect(response.status).toBe(404);
    // expect(response.body.message).toBe(
    //   "this product is not found in this productId"
    // );
  });

  // item added to cart successfully

  it("should return 201 if item added to cart successfully", async () => {
    const response = await request(server)
      .post("/cart")
      .send({
        productId: "65113885ebf4076b07976265",
        // quantity:1,
      })
      .set({ "x-api-key": token });
    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThanOrEqual(201);
  });
  // *********if already cart when cart items updated successfully
  // it("should return 200 if cart already exits , items updated successfully", async () => {
  //   const response = await request(server)
  //     .post("/cart")
  //     .send({
  //       productId: "65113885ebf4076b07976265",
  //       quantity: 1,
  //     })
  //     .set({ "x-api-key": token });

  //   expect(response.status).toBe(200);
  // });
});

//update cart api
describe("update cart api", () => {
  // if token not present in header
  it("should return 401 if token is not present in header", async () => {
    const response = await request(server).put("/cart").send({}).set({});
    expect(response.status).toBe(401);
  });

  it("should return 400 if invalid request", async () => {
    const response = await request(server)
      .put("/cart")
      .send({
        // only two field is required
        productId: "65113885ebf4076b07976266",
        quantity: 1,
        stock: 2,
      })
      .set({ "x-api-key": token });
    expect(response.body.message).toBe("invlid request");
    expect(response.status).toBe(400);
  });
  //if product not found with given  productId
  it("should return 404 if product not found with given Id", async () => {
    const response = await request(server)
      .put("/cart")
      .send({
        productId: "64c77eeacce3b1afb1c5b7e2",
        quantity: 1,
      })
      .set({ "x-api-key": token });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("product not found with given Id");
  });

  /// if maximum quantity to buy if stock not available
  it("should return 400 if maximum quantity to buy if stock not available ", async () => {
    const response = await request(server)
      .put("/cart")
      .send({
        productId: "65113885ebf4076b07976265",
        quantity: 500,
      })
      .set({ "x-api-key": token });
    expect(response.status).toBe(400);
  });
  // product or item not found in your cart
  it("should return 404 if product not found in cart ", async () => {
    const response = await request(server)
      .put("/cart")
      .send({
        productId: "65113885ebf4076b0797626a",
        quantity: 1,
      })
      .set({ "x-api-key": token });
    // expect(response.body.message).toBe("This product not found in your cart");
    expect(response.status).toBe(404);
  });

  //cart updated seccussfully
  it("should return 200 if cart updated seccussfully ", async () => {
    const response = await request(server)
      .put("/cart")
      .send({
        productId: "65113885ebf4076b07976265",
        quantity: 1,
      })
      .set({ "x-api-key": token });
    expect(response.status).toBe(200);
    // expect(response.body.message).toBe("cart  updated");
  });
});

///get cart details
describe("get cartDetails", () => {
  it("should return 401 unauthorized access", async () => {
    const response = await request(server).get("/cart");
    expect(response.status).toBe(401);
  });
  // get cart details
  it("should return 200  successfully get cartDetails ", async () => {
    const response = await request(server)
      .get("/cart")
      .send({})
      .set({ "x-api-key": token });
    expect(response.status).toBe(200);
  });
});
