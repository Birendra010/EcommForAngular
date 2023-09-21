const request = require("supertest");
const randomstring = require("randomstring");
let server;
const emailToken = randomstring.generate();

beforeEach(async () => {
  await require("../index").close();
  server = require("../index");
});
afterEach(async () => {
  await server.close();
});

describe("User signup ", () => {
  //register/signup  user
  it("should return 422 if Unprocessable Entity", () => {
    return request(server)
      .post("/signup")
      .send({
        name: "birendra",
        email: "birendra@gmail.com",
        phone: "8757742030",
        password: "123456",
        lname: "kumar",
      })
      .expect(422);
  });

  it("should return 400 if inputs are invalid by joi ", () => {
    return request(server)
      .post("/signup")
      .send({
        name: "bi",
        email: "ysoniya437@gmail.com",
        mobile: "8757742030",
        password: "123456",
      })
      .expect(400);
  });

  it("should return 409 if Email already exist ", () => {
    return request(server)
      .post("/signup")
      .send({
        name: "biendra",
        email: "ysoniya437@gmail.com",
        mobile: "8757742030",
        password: "123456",
      })
      .expect(409);
  });
  // it("should return 201 if User is register ", () => {
  //   return request(server)
  //     .post("/signup")
  //     .send({
  //       name: "biendra",
  //       email: "ysoniya@gmail.com",
  //       mobile: "8757742030",
  //       password: "123456",
  //     })
  //     .expect(201);
  // });
});

//login
describe("User login", () => {
  it("should return 422 if Unprocessable Entity", () => {
    return request(server)
      .post("/login")
      .send({
        password: "123456",
        email: "birendra@gmail.com",
        lname: "kumar",
      })
      .expect(422);
  });

  it("should return 400 if email or password are not present", () => {
    return request(server)
      .post("/login")
      .send({
        password: "123456",
        // email: "birendra@gmail.com",
        // lname: "kumar",
      })
      .expect(400);
  });

  it("should return 409 if email or password are not correct", () => {
    return request(server)
      .post("/login")
      .send({
        password: "12345",
        email: "ysoniya@gmail.com",
      })
      .expect(409);
  });

  it("should return 200 if user inter Valid credentials ", () => {
    return request(server)
      .post("/login")
      .send({
        password: "123456",
        email: "ysoniya@gmail.com",
      })
      .expect(200);
  });
});

//forgot password
describe("forgot password", () => {
  it("should return 404 if email is not exist", () => {
    return request(server)
      .post("/forgotPassword")
      .send({
        // email: "ysoniya@gmail.com",
      })
      .expect(404);
  });

  it("should return 200 if url send seccessfully on email ", () => {
    return request(server)
      .post("/forgotPassword")
      .send({
        email: "ysoniya@gmail.com",

      })
      .expect(200);
  });
});


// update password 

// describe("update password ", () => {
//      it("should return 400 if token expired or empty ", () => {
//        return request(server)
//          .post(`/resetPassword/:${emailToken}`)
//          .send({
//            //  password: "",
//            //  newPassword:""
//          })
//          .expect(200);
//      });
// })
