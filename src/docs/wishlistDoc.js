const string = {
  type: "string",
};
const number = {
  type: "number",
};

const product = {
  _id: string,
  title: string,
  brand: string,
  category: string,
  description: string,
  stock: number,
  price: number,
  rating: number,
  thumbnail: string,
  image_url: {
    type: "array",
    items: string,
  },
};

const createWishlist = {
  tags: ["Wishlist"],
  description: "item added to wishlist successfully ",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/createWishlistBody",
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
      description: "when wishlist created successfully!",
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
                example: "item added to wishlist",
              },
              wishlist: {
                type: "object",
                properties: {
                  _id: string,
                  userId: string,

                  products: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: product,
                    },
                  },

                  createdAt: string,
                  updatedAt: string,
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




const getWishlist = {
  tags: ["Wishlist"],
  description: "get wishlist successfully ",
//   requestBody: {
//     content: {
//       "application/json": {
//         schema: {
//           $ref: "#/components/schemas/createWishlistBody",
//         },
//       },
//     },
//     required: true,
//   },
  security: [
    {
      ApiKeyAuth: [],
    },
  ],
  responses: {
    201: {
      description: "when get  wishlist  successfully!",
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
                example: "success",
              },
              wishlist: {
                type: "object",
                properties: {
                  _id: string,
                  userId: string,

                  products: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: product,
                    },
                  },

                  createdAt: string,
                  updatedAt: string,
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




const updateWishlist = {
  tags: ["Wishlist"],
  description: "wishlist updated ",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/updateWishlistBody",
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
      description: "when wishlist updated successfully!",
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
                example: "success",
              },
              wishlist: {
                type: "object",
                properties: {
                  _id: string,
                  userId: string,

                  products: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: product,
                    },
                  },

                  createdAt: string,
                  updatedAt: string,
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



const createWishlistBody = {
  type: "object",
  properties: {
    productId: {
      type: "string",
      example: "65113885ebf4076b07976269",
    },
  },
};



const updateWishlistBody = {
  type: "object",
  properties: {
    productId: {
      type: "string",
      example: "65113885ebf4076b07976269",
    },
  },
};

module.exports = {
  createWishlist,
  createWishlistBody,
  getWishlist,
  updateWishlist,
  updateWishlistBody,
};
