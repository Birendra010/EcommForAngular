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

  // when order seccussfully  placed
  // it("should return 200 Order seccuss", async () => {
  //   const response = await request(server)
  //     .post("/order")
  //     .send(data)
  //     .set({ "x-api-key": token });
  //   expect(response.body.message).toBe("Order seccuss");
  //   expect(response.status).toBe(200);
  // });
});

///*********get Order api***************
describe("Get Order api", () => {
  // if teken not present in header
  it("should return 401 if token is not present in header", async () => {
    const response = await request(server).get("/order").set({});
    expect(response.status).toBe(401);
  });

  it("should return 200 if seccussfull get all order ", async () => {
    const response = await request(server)
      .get("/order")
      .set({ "x-api-key": token });

    expect(response.status).toBe(200);
  });
});

///// *******Get order by Id *******
describe("Get OrderById  api", () => {
  // if teken not present in header
  it("should return 401 if token is not present in header", async () => {
    const response = await request(server)
      .get("/order/651267f9d3f558f0ef967406")
      .set({});
    expect(response.status).toBe(401);
  });
  // if invalid orderId
  it("should return 400 if invalid orderId", async () => {
    const response = await request(server)
      .get("/order/64e5dfac95868")
      .set({ "x-api-key": token });

    expect(response.status).toBe(400);
  });
  // not complete any order with given orderId
  it("should return 404 You have not completed any order ", async () => {
    const response = await request(server)
      .get("/order/64e5dfac95868ccc559258e1")
      .set({ "x-api-key": token });
    expect(response.status).toBe(404);
  });
  ////if seccussfully get Order with Given OrderId
  it("should return 200 if seccussfully get Order with Given OrderId ", async () => {
    const response = await request(server)
      .get("/order/65128260fbf6d18b5859c9fa")
      .set({ "x-api-key": token });

    expect(response.status).toBe(200);
  });
});

/// *********Cancel Product In Order Api
describe("cancel Product in Order", () => {
  // if teken not present in header
  it("should return 401 if token is not present in header", async () => {
    const response = await request(server)
      .put("/order/651267f9d3f558f0ef967406")
      .set({});
    expect(response.status).toBe(401);
  });

  // if invalid orderId
  it("should return 400 if invalid orderId", async () => {
    const response = await request(server)
      .put("/order/64e5dfac95868")
      .send({
        productId: "65113885ebf4076b07976265",
      })
      .set({ "x-api-key": token });

    expect(response.status).toBe(400);
  });

  // if productId not provide in body
  it("should return 400 if productId not provide in body", async () => {
    const response = await request(server)
      .put("/order/651267f9d3f558f0ef967406")
      .send({
        // productId: "65113885ebf4076b07976265",
      })
      .set({ "x-api-key": token });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Please provide productId");
  });

  // when invalid product id
  it("should return 400 if invaild  productId ", async () => {
    const response = await request(server)
      .put("/order/651267f9d3f558f0ef967406")
      .send({
        productId: "65113885ebf4076",
      })
      .set({ "x-api-key": token });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("invlid productId");
  });

  //*********** */ when order status are pending or canceled so  can not update
  // it("should return 400 order status are pending or canceled so  can not update", async () => {
  //   const response = await request(server)
  //     .put("/order/651267f9d3f558f0ef967406")
  //     .send({
  //       productId: "65113885ebf4076b07976265",
  //     })
  //     .set({ "x-api-key": token });

  //   expect(response.status).toBe(400);
  //   expect(response.body.message).toBe("Order cannot be updated");
  // });

  //****** */ product not found with given productId
  // it("should return 404 if product not found with given productId ", async () => {
  //   const response = await request(server)
  //     .put("/order/65128260fbf6d18b5859c9fa")
  //     .send({
  //       productId: "64c77eeacce3b1afb1c5b7e6", //change collection
  //     })
  //     .set({ "x-api-key": token });

  //   expect(response.body.message).toBe(
  //     "product not found with given productId"
  //   );
  //   expect(response.status).toBe(404);
  // });
  // ********inside order not added any product or items
  // it("should return 404 if order items already empty ", async () => {
  //   const response = await request(server)
  //     .put("/order/65128260fbf6d18b5859c9fa")
  //     .send({
  //       productId: "65113885ebf4076b0797626c",
  //     })
  //     .set({ "x-api-key": token });

  //   expect(response.body.message).toBe("your order is already empty");
  //   expect(response.status).toBe(400);
  // });

  /// ****if product  seccussfully cancel in order or update order
  // it("should return 200 if seccussfully update order ", async () => {
  //   const response = await request(server)
  //     .put("/order/65128260fbf6d18b5859c9fa")
  //     .send({
  //       productId: "65113885ebf4076b07976265",
  //     })
  //     .set({ "x-api-key": token });

  //   expect(response.body.message).toBe("order updated");
  //   expect(response.status).toBe(200);
  // });
});

///********cancel order ********/

describe("cancel order api", () => {
  // if teken not present in header
  it("should return 401 if token is not present in header", async () => {
    const response = await request(server)
      .put("/order/cancel/651267f9d3f558f0ef967406")
      .set({});
    expect(response.status).toBe(401);
  });

  // if invalid orderId
  it("should return 400 if invalid orderId", async () => {
    const response = await request(server)
      .put("/order/cancel/64e5dfac95868")
      .send({})
      .set({ "x-api-key": token });

    expect(response.status).toBe(400);
  });

  //*********** */ when order status are pending or canceled so  can not update
  it("should return 400 order status are pending or canceled so  can not update", async () => {
    const response = await request(server)
      .put("/order/cancel/65128260fbf6d18b5859c9fa")
      .send({})
      .set({ "x-api-key": token });

    expect(response.body.message).toBe("Order cannot be cancel");
    expect(response.status).toBe(400);
  });
  //if order canceled seccussfully
  // it("should return 200 if order seccussfully canceled", async () => {
  //   const response = await request(server)
  //     .put("/order/cancel/65128260fbf6d18b5859c9fa")
  //     .send({})
  //     .set({ "x-api-key": token });

  //   expect(response.status).toBe(200);
  // });
});



