
const {createUser,createUserBody, loginUser,loginUserBody,refreshToken,refreshTokenBody}=require('./userDoc')
const swaggerDefinition = {
  // previous content here
  openapi: "3.0.0",
  info: {
    version: "1.3.0",
    title: "My REST API - Documentation",
    description: "Description of my API here",
    termsOfService: "https://mysite.com/terms",
    contact: {
      name: "Birendra ",
      email: "dev@example.com",
      url: "https://devwebsite.com",
    },
    license: {
      name: "Apache 2.0",
      url: "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Local Server",
    },
    // {
    //   url: "https://api.mysite.com",
    //   description: "Production Server",
    // },
  ],
  //   tags: [
  //     {
  //       name: "Roles",
  //     },
  //     {
  //       name: "Users",
  //     },
  //   ],
  paths: {
    "/signup": {
      post: createUser,
    },
    "/login": {
      post: loginUser,
    },
    "/refresh-token": {
      post: refreshToken,
    },
  },

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      createUserBody,
      loginUserBody,
      refreshTokenBody,
    },
  },
};
module.exports = { swaggerDefinition };
