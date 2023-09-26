const request = require("supertest");
const randomstring = require("randomstring");
const server = require("../index");
let token;
let data;
let user;
const emailToken = randomstring.generate();

beforeEach(async () => {
  await server.close();
  data = {
    name: "birendra",
    email: "birendra@gmail.com",
    phone: "8757742030",
    password: "12345",
  };
});
afterEach(async () => {
  await server.close();
});

describe("User signup ", () => {
  //register/signup  user
  //if user enter  invaild input
  it("should return 422 if Unprocessable Entity", async () => {
    user = await request(server)
      .post("/signup")
      .send({
        name: "birendra",
        email: "birendra@gmail.com",
        phone: "8757742030",
        password: "123456",
        invalidInput: "kumar",
      })
      .expect(422);
  });
// joi validation like password length , name ....
  it("should return 400 if inputs are invalid by joi ", async () => {
    user = await request(server)
      .post("/signup")
      .send({
        name: "bi",
        email: "birendra@gmail.com",
        mobile: "8757742030",
        password: "123456",
      })
      .expect(400);
  });
//  if dublicate email 
  it("should return 409 if Email already exist ", async () => {
    const response = await request(server).post("/signup").send({
      name: "biendra",
      email: "invailidemail@gmail.com",
      mobile: "8757742030",
      password: "123456",
    });
    expect(response.status).toBe(409);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Email already exist",
        status: false,
      })
    );
  });
  ///*****if user register successfully */
  // it("should return 201 if User is register successfully ",async () => {
  //   const response =await request(server).post("/signup").send({
  //     name: "biendra",
  //     email: "ysoniya@gmail.com",
  //     mobile: "8757742030",
  //     password: "12345",
  //   });
  //   expect(response.status).toBe(200);
  // });
});

//*********login***********
// invalid input field request
describe("User login", () => {
  it("should return 422 if Unprocessable Entity", async () => {
    const response = await request(server).post("/login").send({
      password: "12345",
      email: "birendra@gmail.com",
      lname: "kumar",
    });
    expect(response.status).toBe(422);
  });
  // invalid email and password
  it("should return 400 if email or password are not present", async () => {
    const response = await request(server).post("/login").send({
      password: "12345",
      // email: "birendra@gmail.com",
      // lname: "kumar",
    });
    expect(response.status).toBe(400);
  });
  // if email is not correct
  it("should return 409 if email is not correct", async () => {
    const response = await request(server).post("/login").send({
      password: "12345",
      email: "invailid@gmail.com",
    });
    expect(response.status).toBe(409);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "email is not corerct",
        status: false,
      })
    );
  });
  // if password is not correct

  it("should return 409 if password is not correct", async () => {
    const response = await request(server).post("/login").send({
      password: "1234",
      email: "invailidemail@gmail.com",
    });
    expect(response.status).toBe(409);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Password is not corerct",
        status: false,
      })
    );
  });
// user login successfully
  it("should return 200 if user inter Valid credentials or login seccessfully  ", async () => {
    const response = await request(server).post("/login").send({
      password: "123456",
      email: "invailidemail@gmail.com",
    });

    expect(response.status).toBe(200);
    token = response.body.token;
  });
});

//************forgot password*************
describe("forgot password", () => {
  it("should return 400 if email is not present ", async () => {
    const response = await request(server).post("/forgot-password").send({
      // email: "ysoniya@gmail.com",
    });
    expect(response.status).toBe(400);
  });

  it("should return 404 if user is not exist", async () => {
    const response = await request(server).post("/forgot-password").send({
      email: "wronggmail@gmail.com",
    });
    expect(response.status).toBe(404);
  });

  it("should return 200 if url send seccessfully on email ", async () => {
    const response = await request(server).post("/forgot-password").send({
      email: "invailidemail@gmail.com",
      emailToken,
    });
    expect(response.status).toBe(200);
  });
});

// ************update password************
describe("update password ", () => {
  it("should return 400 if password field is empty ", async () => {
    const response = await request(server)
      .put(`/reset-password/${emailToken}`)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "password field is required",
        status: false,
      })
    );
  });

  // it("should return 200 if User password has been reset ", async () => {
  //   const response = await request(server)
  //     .put(`/reset-password/${emailToken}`)
  //     .send({
  //       newPassword: "123456",
  //     })
  //     expect(response.status).toBe(200);
  // });
});

//*******logout************
 
describe("logout", () => {
  it("should return 401 if token is not present in header", async () => {
    const response = await request(server).get("/logout").send({}).set({});
    expect(response.status).toBe(401);
  });
// logout seccessfully
  it("should return 200 if logout successfully", async () => {
    const response = await request(server).get("/logout").set({
      "x-api-key": token,
    });
    expect(response.status).toBe(200);
  });
});
