const request = require("supertest");
const server = require("../index");

let token;

beforeEach(async () => {
  await server.close();
  data = {
    name: "birendra",
    phone: "8757742030",
    house: "bettiah",
    city: "bettiah",
    state: "bihar",
    pincode: 875742,
  };
});
afterEach(async () => {
  await server.close();
});

describe("Order api", () => {
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

//create Order
describe("Order api", () => {
  // if teken not present in header
  it("should return 401 if token is not present in header", async () => {
    const response = await request(server).post("/order").send({}).set({});
    expect(response.status).toBe(401);
  });

  it("should return 400 if invailid data", async () => {
    const response = await request(server)
      .post("/order")
      .send({
        name: "birendra",
        phone: "8757742030",
        house: "bettiah",
        city: "bettiah",
        state: "bihar",
        pincode: 875742,
        invailid: "input",
      })
      .set({ "x-api-key": token });
    expect(response.body.message).toBe("invalid data");
    expect(response.status).toBe(400);
  });

  // form Error or Joi validation
  it("should return 400 if input validation error", async () => {
    const response = await request(server)
      .post("/order")
      .send({
        name: "b",
        phone: "87308",
        house: "bettiah",
        city: "bettiah",
        state: "bihar",
        pincode: 87,
      })
      .set({ "x-api-key": token });
    expect(response.status).toBe(400);
  });

  ///  if cart is empty when place order
  //   it("should return 400 if cart is empty when place order", async () => {
  //     const response = await request(server)
  //       .post("/order")
  //       .send(data)
  //       .set({ "x-api-key": token });
  //     expect(response.body.message).toBe(
  //       "Please add some items in cart to place order"
  //     );
  //     expect(response.status).toBe(400);
  //   });

  // if some products are out of stocks
  //   it("should return 400 if some products are out of stocks ", async () => {
  //     const response = await request(server)
  //       .post("/order")
  //       .send(data)
  //       .set({ "x-api-key": token });
  //     expect(response.body.message).toBe("some product are out of stock");
  //     expect(response.status).toBe(400);
    //   });
    


// when order placed
  it("should return 200 Order seccuss", async () => {
    const response = await request(server)
      .post("/order")
      .send(data)
      .set({ "x-api-key": token })
    expect(response.body.message).toBe("Order seccuss")
    expect(response.status).toBe(200);
  });
});
