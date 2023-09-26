const createUser = {
  tags: ["Users"],
  description: "Create a new use in the system",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/createUserBody",
        },
      },
    },
    required: true,
  },
  responses: {
    201: {
      description: "User created successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              _id: {
                type: "string",
              },
              name: {
                type: "string",
              },
              mobile: {
                type: "string",
              },
              email: {
                type: "string",
              },
              password: {
                type: "string",
              },
              token: {
                type: "string",
              },
              tokenExp: {
                type: "number",
              },
              tokens: [{ type: "object" }],

              createdAt: {
                type: "string",
              },
              updatedAt: {
                type: "string",
              },
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Internal Server Error",
              },
            },
          },
        },
      },
    },
  },
};

const loginUser = {
  tags: ["Users"],
  description: "login successful",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/loginUserBody",
        },
      },
    },
    required: true,
  },
  responses: {
    200: {
      description: "login successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: {
                type: "boolean",
              },
              message: {
                type: "string",
                example: "login successful",
              },
              email: {
                type: "string",
              },

              token: {
                type: "string",
              },

              refreshToken: {
                type: "string",
              },
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Internal Server Error",
              },
            },
          },
        },
      },
    },
  },
};

const refreshToken = {
  tags: ["Users"],
  description: "token refresh  successfully",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/refreshTokenBody",
        },
      },
    },
    required: true,
  },
  responses: {
    200: {
      description: "token refresh successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: {
                type: "boolean",
              },
              message: {
                type: "string",
                example: "token refresh successfully!",
              },

              token: {
                type: "string",
                required: true,
              },
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Internal Server Error",
              },
            },
          },
        },
      },
    },
  },
};

const createUserBody = {
  type: "object",
  properties: {
    name: {
      type: "string",
      example: "John Snow",
    },
    email: {
      type: "string",
      example: "john.snow@email.com",
    },
    mobile: {
      type: "string",
      example: "8757742452",
    },
    password: {
      type: "string",
      description: "unencrypted user's password",
      example: "!1234aWe1Ro3$#",
    },
  },
};

const loginUserBody = {
  type: "object",
  properties: {
    email: {
      type: "string",
      example: "john.snow@email.com",
    },
    password: {
      type: "string",
      description: "unencrypted user's password",
      example: "!1234aWe1Ro3$#",
    },
  },
};

const refreshTokenBody = {
  type: "object",
  properties: {
    refreshToken: {
      type: "string",
     
      example:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTBkODljNjhhNWMwODc3OWQyZDMxOTAiLCJpYXQiOjE2OTU3MzM1NDYsImV4cCI6MTY5NTczNDc0Nn0.PdF_IrSEphPaQrfZiAe5Dh1pVA-i4N9MMa3g4Zrf4Hk",
    },
  },
};

module.exports = {
  createUser,
  createUserBody,
  loginUserBody,
  loginUser,
  refreshTokenBody,
  refreshToken,
};
