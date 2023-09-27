const product = {
  _id: { type: "string" },
  title: { type: "string" },
  description: { type: "string" },
  price: { type: "number" },
  discountPercentage: { type: "number" },
  rating: { type: "number" },
  brand: { type: "string" },
  stock: { type: "number" },
  category: {
    type: "string",
  },
  thumbnail: { type: "string" },
  image_url: {
    type: "array",
    items: { type: "string" },
  },
};

const getLimitedProducts = {
  tags: ["Products"],
  description: "getLimitedProducts  ",

  //   security: [
  //     {
  //       ApiKeyAuth: [],
  //     },
  //   ],
  responses: {
    201: {
      description: "When getLimitedProducts successfully!",
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
                example: "successful",
              },
              products: {
                type: "array",
                items: {
                  type: "object",
                  properties: product,
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

const getPopularProducts = {
  tags: ["Products"],
  description: "getPopularProducts  ",

  //   security: [
  //     {
  //       ApiKeyAuth: [],
  //     },
  //   ],
  responses: {
    201: {
      description: "When getPopularProducts successfully!",
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
                example: "successful",
              },
              products: {
                type: "array",
                items: {
                  type: "object",
                  properties: product,
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

const getAllproducts = {
  tags: ["Products"],
  description: "getAllproducts  ",

  //   security: [
  //     {
  //       ApiKeyAuth: [],
  //     },
  //   ],
  responses: {
    201: {
      description: " getAllproducts successfully!",
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
                example: "successful",
              },
              products: {
                type: "array",
                items: {
                  type: "object",
                  properties: product,
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

const getProductById = {
  tags: ["Products"],
  description: "get product",

  parameters: [
    {
      name: "id",
      in: "path",
      description: "productId",
      required: true,
      type: "string",
    },
  ],
  responses: {
    201: {
      description: " successfully!",
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
                example: "successful",
              },
              products: {
                // type: "array",
                // items: {
                type: "object",
                properties: product,
                // },
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

module.exports = {
  getLimitedProducts,
  getPopularProducts,
  getAllproducts,
  getProductById,
};



