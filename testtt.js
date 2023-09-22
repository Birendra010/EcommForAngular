// const request = require("supertest");
// const mongoose = require("mongoose");
// const User = require("../../models/user.model");
// const { WorkspaceModel } = require("../../models/workspace.model");
// const {
//   generateAccountVerifyToken,
// } = require("../../services/generateAccountVerify");
// let server;
// let user;
// let data;
// let url;
// let token, userToken;
// let workspace;
// beforeEach(async () => {
//   await require("../../app").close();
//   server = require("../../app");
//   data = {
//     fullName: "tests cooper",
//     email: "testcooperauth12@gmail.com",
//     password: "Test@123",
//   };
// });
// afterEach(async () => {
//   await server.close();
// });
// describe("/api/v1/auth/login", () => {
//   describe("POST", () => {
//     it("should return 200 if user", async () => {
//       user = await request(server).post("/api/v1/user").send(data);
//       const verifyToken = await generateAccountVerifyToken(data.email);
//       const response = await request(server)
//         .post("/api/v1/auth/user/verify")
//         .send({
//           verifyToken,
//         });
//       expect(response.status).toBe(200);
//       expect(response.body?.data?.isVerified).toBeTruthy();
//     }, 7000);
//     it("should return 200 if email and password is correct", async () => {
//       const response = await request(server).post("/api/v1/auth/login").send({
//         email: "testcooperauth12@gmail.com",
//         password: "Test@123",
//       });
//       token = response.body?.data?.token;
//       userToken = response.body?.data?.token;
//       expect(response.status).toBe(200);
//     }, 8000);
//     it("should return 200 if workspace created", async () => {
//       workspace = await request(server)
//         .post("/api/v1/workspace")
//         .set("x-auth-token", token)
//         .send({
//           name: "RudraAuth",
//           key: "rudraauth",
//           type: "IT SERVICES Auth",
//         });
//       expect(workspace.status).toBe(200);
//     });
//     it("should return 404 if email is not exist", async () => {
//       const response = await request(server).post("/api/v1/auth/login").send({
//         email: "testcoopers321ss@gmail.com",
//         password: "Test@123",
//       });
//       expect(response.status).toBe(404);
//     });
//     it("should return 400 if password is incorrect", async () => {
//       const response = await request(server).post("/api/v1/auth/login").send({
//         email: "testcooperauth12@gmail.com",
//         password: "Wrong@123",
//       });
//       expect(response.status).toBe(400);
//     });

//     it("should return 200 after workspace set", async () => {
//       const response = await request(server).post("/api/v1/auth/login").send({
//         email: "testcooperauth12@gmail.com",
//         password: "Test@123",
//       });
//       token = response.body.token;
//       expect(response.status).toBe(200);
//     });
//   });
// });
// describe("/api/v1/auth/otp/generate", () => {
//   describe("POST", () => {
//     it("should return 200", async () => {
//       const response = await request(server)
//         .post("/api/v1/auth/otp/generate")
//         .send({
//           email: "testcooperauth12@gmail.com",
//         });
//       expect(response.status).toBe(200);
//     }, 8000);
//     it("should return 404 if user not found", async () => {
//       const response = await request(server)
//         .post("/api/v1/auth/otp/generate")
//         .send({
//           email: "test123@gmail.com",
//         });
//       expect(response.status).toBe(404);
//     });
//   });
// });
// describe("/api/v1/auth/otp/verify", () => {
//   describe("POST", () => {
//     it("should return 200", async () => {
//       let users = await User.findById(user.body.data?._id);
//       const response = await request(server)
//         .post("/api/v1/auth/otp/verify")
//         .send({
//           email: "testcooperauth12@gmail.com",
//           otp: users.otp?.otp_number,
//         });
//       url = response.body.data.url;
//       expect(response.status).toBe(200);
//     });
//     it("should return 400 if OTP is incorrect", async () => {
//       const response = await request(server)
//         .post("/api/v1/auth/otp/verify")
//         .send({
//           email: "testcooperauth12@gmail.com",
//           otp: "1234",
//         });
//       expect(response.status).toBe(400);
//     });
//   });
// });
// describe("/api/v1/auth/password", () => {
//   describe("POST", () => {
//     it("should return 400 if password is already used", async () => {
//       const response = await request(server)
//         .post("/api/v1/auth/password")
//         .send({
//           token: url,
//           password: "Test@123",
//         });
//       expect(response.status).toBe(400);
//     });
//     it("should return 200", async () => {
//       const response = await request(server)
//         .post("/api/v1/auth/password")
//         .send({
//           token: url,
//           password: "Password@123",
//         });
//       expect(response.status).toBe(200);
//     });
//     it("should return 500 when url url is used twice", async () => {
//       const response = await request(server)
//         .post("/api/v1/auth/password")
//         .send({
//           token: url,
//           password: "Password@123",
//         });
//       expect(response.status).toBe(500);
//     });
//   });
// });

// describe("/api/v1/auth/verify-account", () => {
//   describe("POST", () => {
//     it("should return 200 login when user is unverified", async () => {
//       const response = await request(server).post("/api/v1/auth/login").send({
//         email: "testcooperauth12@gmail.com",
//         password: "Password@123",
//       });
//       expect(response.status).toBe(200);
//       expect(response.body?.data?.isVerified).toBeFalsy();
//     });
//     it("should return 400 if user try to verify with invalid token", async () => {
//       const response = await request(server)
//         .post("/api/v1/auth/user/verify")
//         .send({
//           verifyToken: userToken,
//         });
//       expect(response.status).toBe(400);
//     });
//     it("should return 400 if user try to verify without token", async () => {
//       const response = await request(server)
//         .post("/api/v1/auth/user/verify")
//         .send({});
//       expect(response.status).toBe(400);
//     });
//     it("should return 400 if user try to verify wrong token", async () => {
//       const response = await request(server)
//         .post("/api/v1/auth/user/verify")
//         .send({
//           verifyToken: "dfgdfgdfsgdfgseryerytre",
//         });
//       expect(response.status).toBe(400);
//     });
//     it("should return 400 if user is already verified", async () => {
//       const verifyToken = await generateAccountVerifyToken(
//         "testcooperauth12@gmail.com"
//       );
//       const response = await request(server)
//         .post("/api/v1/auth/user/verify")
//         .send({
//           verifyToken,
//         });
//       expect(response.status).toBe(400);
//       expect(response.body?.isVerified).toBeTruthy();
//     });
//     it("should return 200 login when user is verified", async () => {
//       const response = await request(server).post("/api/v1/auth/login").send({
//         email: "testcooperauth12@gmail.com",
//         password: "Password@123",
//       });
//       (user = response), (userToken = response.body.data?.token);
//       expect(response.status).toBe(200);
//     });
//   });
// });

// describe("/api/v1/auth/password/reset", () => {
//   describe("POST", () => {
//     it("should return 200 if password is successfully updated.", async () => {
//       const response = await request(server)
//         .post("/api/v1/auth/password/reset")
//         .set("x-auth-token", userToken)
//         .send({
//           currentPassword: "Password@123",
//           newPassword: "UpTest@321",
//         });
//       expect(response.status).toBe(200);
//     });
//     it("should return 400 if old password is used", async () => {
//       const auth = await request(server).post("/api/v1/auth/login").send({
//         email: "testcooperauth12@gmail.com",
//         password: "UpTest@321",
//       });
//       token = auth.body.data.token;
//       const response = await request(server)
//         .post("/api/v1/auth/password/reset")
//         .set("x-auth-token", token)
//         .send({
//           currentPassword: "UpTest@321",
//           newPassword: "Test@123",
//         });
//       expect(response.status).toBe(400);
//     });
//     it("should return 400 if invalid current password is provided.", async () => {
//       const response = await request(server)
//         .post("/api/v1/auth/password/reset")
//         .set("x-auth-token", token)
//         .send({
//           currentPassword: "UpTest@322",
//           newPassword: "reTest@123",
//         });
//       expect(response.status).toBe(400);
//     });
//   });
// });
// describe("Disconnect", () => {
//   it("dissconnect mongodb", async () => {
//     await WorkspaceModel.deleteOne({ _id: workspace?.body?.data?._id });
//     await User.deleteOne({ _id: user?.body?.data?._id });
//     await mongoose.disconnect();
//   });
// });
