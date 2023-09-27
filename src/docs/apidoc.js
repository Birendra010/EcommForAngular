const {
  createUser,
  createUserBody,
  loginUser,
  loginUserBody,
  refreshToken,
  refreshTokenBody,
  forgotPasswordBody,
  forgotPassword,
  updatePassword,
  updatePasswordBody,
  logout,
} = require("./userDoc");

const {
  createCartBody,
  createCart,
  getCartDetails,
  updateCart,
  updateCartBody,
} = require("./cartDoc");
const {
  getLimitedProducts,
  getPopularProducts,
  getAllproducts,
  getProductById
} = require("./productDoc");
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

    "/forgot-password": {
      post: forgotPassword,
    },

    "/reset-password/{emailToken}": {
      put: updatePassword,
    },
    "/logout": {
      get: logout,
    },

    "/cart": {
      post: createCart,
      get: getCartDetails,
      put: updateCart,
    },

    "/limited-products": {
      get: getLimitedProducts,
    },

    "/popular-products": {
      get: getPopularProducts,
    },
    "/products": {
      get: getAllproducts,
    },
    "/product/{id}": {
      get: getProductById,
    },
  },

  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: "apiKey",
        in: "header",
        name: "X-API-KEY",
      },
    },
    schemas: {
      createUserBody,
      loginUserBody,
      refreshTokenBody,
      forgotPasswordBody,
      updatePasswordBody,
      createCartBody,
      updateCartBody,
    },
  },
};
module.exports = { swaggerDefinition };
