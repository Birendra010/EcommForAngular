const product = {
  productId: {
    type: "object",
    properties: {
      _id: { type: "string" },
      title: { type: "string" },
      brand: { type: "string" },
      description: { type: "string" },
      stock: { type: "number" },
      price: { type: "number" },
      thumbnail: { type: "string" },
      image_url: {
        type: "array",
        items: { type: "string" },
      },
    },
  },
  quantity: { type: "number" },
};

const createCart = {
  tags: ["Carts"],
  description: "Create cart ",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/createCartBody",
        },
      },
    },
    required: true,
  },
  security: [
    {
      ApiKeyAuth: [],
    },
  ],
  responses: {
    201: {
      description: "When cart item added successfully!",
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
                example: "item added successfully",
              },
              _id: {
                type: "string",
              },
              userId: {
                type: "string",
              },

              items: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    productId: { type: "string" },
                    quantity: { type: "number" },
                  },
                },
              },
              totalPrice: {
                type: "number",
              },
              totalItems: {
                type: "number",
              },

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

const getCartDetails = {
  tags: ["Carts"],
  description: "getCartDetails  ",

  security: [
    {
      ApiKeyAuth: [],
    },
  ],
  responses: {
    201: {
      description: "When getCartDetails successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
                properties: {
                    status: {
                    type:"boolean"
                    },
                    message: {
                        type: "string",
                        example:"successful"
                    },
              cart: {
                type: "object",
                properties: {
                  _id: { type: "string" },
                  userId: { type: "string" },
                  items: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: product,
                    },
                  },
                },
              },
              totalPrice: {
                type: "number",
              },
              totalItems: {
                type: "number",
              },

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

const updateCart = {
  tags: ["Carts"],
  description: "update cart ",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/updateCartBody",
        },
      },
    },
    required: true,
  },
  security: [
    {
      ApiKeyAuth: [],
    },
  ],
  responses: {
    201: {
      description: "When cart updated successfully!",
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
                example: "cart updated successfully",
              },
              cart: {
                type: "object",
                properties: {
                  _id: {
                    type: "string",
                  },
                  userId: {
                    type: "string",
                  },
                  items: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: product,
                    },
                  },
                  totalPrice: {
                    type: "number",
                  },
                  totalItems: {
                    type: "number",
                  },

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

const createCartBody = {
  type: "object",
  properties: {
    productId: {
      type: "string",
      example: "65113885ebf4076b07976269",
    },
  },
};

const updateCartBody = {
  type: "object",
  properties: {
    productId: {
      type: "string",
      example: "65113885ebf4076b07976269",
    },
    quantity: {
      type: "number",
      example: 1,
    },
  },
};

module.exports = {
  createCartBody,
  createCart,
  getCartDetails,
  updateCart,
  updateCartBody,
};
