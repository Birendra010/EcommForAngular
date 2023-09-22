const request = require("supertest");
const server = require("../index");
let cart;
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTBkNjZiNzg0NzE4MDBmMDdhZWJhNDAiLCJpYXQiOjE2OTUzNzcwODAsImV4cCI6MTY5NTM4MDA4MH0.IAzbQcSTj-QivGboSHKnjNvEPq3HdyXvC2JHzvAktsA";

beforeEach(async () => {
  await server.close();
});
afterEach(async () => {
  await server.close();
});

describe("create cart", () => {
  it("should return 400 if invailid requrest", () => {
     cart = request(server)
      .post("/cart")
      .send({
        // name: "hello",
      })
      .set({
        "x-api-key": token,
      });
    expect(response.status).toBe(400);

    expect(response.body).toEqual(
      expect.objectContaining({
        message: "please provide request body",
        status: false,
      })
    );
  });
});

//  it("should return 400 if invailid requrest", () => {
//    return request(server)
//      .post("/cart")
//      .send({
//        //   name:"hello"
//      })
//      .set({
//        "x-api-key": token,
//      })
//      .expect(400)
//      .then((res) => {
//        expect(res.body).toEqual(
//          expect.objectContaining({
//            message: "please provide valid product Id",
//            status: false,
//          })
//        );
//      });
//  });
// });
