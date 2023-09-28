const string = {
  type: "string",
};
const number = {
  type: "number",
};

const { product } = require("./cartDoc");

const shippingInfoDetails = {
  type: "object",
  properties: {
    name: string,
    phone: string,
    address: {
      type: "object",
      properties: {
        house: string,
        city: string,
        state: string,
        pincode: number,
      },
    },
  },
};

const createOrder = {
  tags: ["Orders"],
  description: "create Order  ",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/createOrderBody",
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
      description: "When order placed successfully!",
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
                example: "Order placed  successful",
              },
              userOrder: {
                type: "object",
                properties: {
                  userId: string,

                  items: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        productId: string,
                        quantity: number,
                        canceled: {
                          type: "boolean",
                          example: "false",
                        },
                      },
                    },
                  },
                  totalPrice: number,
                  totalItems: number,
                  status: string,
                  shippingInfo: shippingInfoDetails,
                  paymentStatus: string,
                  paymentId: string,
                  _id: string,
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

const getOrder = {
  tags: ["Orders"],
  description: "successful",

  security: [
    {
      ApiKeyAuth: [],
    },
  ],
  responses: {
    201: {
      description: "When order get successfully!",
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
                example: " successful",
              },
              data: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    shippingInfo: shippingInfoDetails,
                    _id: string,
                    userId: string,
                    items: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: product,
                      },
                    },
                    canceled: {
                      type: "boolean",
                      example: false,
                    },

                    totalPrice: number,
                    totalItems: number,
                    status: string,
                    paymentStatus: string,
                    paymentId: string,

                    createdAt: string,
                    updatedAt: string,
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

const getOrderById = {
  tags: ["Orders"],
  description: "successful",
  parameters: [
    {
      name: "orderId",
      in: "path",
      description: "orderId",
      required: true,
      type: "string",
    },
  ],

  security: [
    {
      ApiKeyAuth: [],
    },
  ],
  responses: {
    201: {
      description: "OrderDetails!",
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
                example: "order Details",
              },
              order: {
                type: "object",
                properties: {
                  shippingInfo: shippingInfoDetails,
                  _id: string,
                  userId: string,
                  items: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: product,
                    },
                  },
                  canceled: {
                    type: "boolean",
                    example: false,
                  },

                  totalPrice: number,
                  totalItems: number,
                  status: string,
                  paymentStatus: string,
                  paymentId: string,

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



const cancelProductInOrder = {
  tags: ["Orders"],
  description: "cancelProductInOrder successful",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/cancelProductInOrderBody",
        },
      },
    },
    required: true,
  },
  parameters: [
    {
      name: "orderId",
      in: "path",
      description: "orderId",
      required: true,
      type: "string",
    },
  ],
  security: [
    {
      ApiKeyAuth: [],
    },
  ],
  responses: {
    201: {
      description: "cancelProductInOrder!",
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
                example: "order updated successfully!",
              },
              order: {
                type: "object",
                properties: {
                  shippingInfo: shippingInfoDetails,
                  _id: string,
                  userId: string,
                  items: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: product,
                    },
                  },
                  canceled: {
                    type: "boolean",
                    example:true
                  },

                  totalPrice: number,
                  totalItems: number,
                  status: string,
                  paymentStatus: string,
                  paymentId: string,

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





const cancelOrder = {
  tags: ["Orders"],
  description: "order canceled successfully",
  parameters: [
    {
      name: "orderId",
      in: "path",
      description: "orderId",
      required: true,
      type: "string",
    },
  ],

  security: [
    {
      ApiKeyAuth: [],
    },
  ],
  responses: {
    201: {
      description: "order canceled successfully!",
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
                example: "order canceled successfully",
              },
              order: {
                type: "object",
                properties: {
                  shippingInfo: shippingInfoDetails,
                  _id: string,
                  userId: string,
                  items: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: product,
                    },
                  },
                  canceled: {
                    type: "boolean",
                    example: true,
                  },

                  totalPrice: number,
                  totalItems: number,
                  status: string,
                  paymentStatus: string,
                  paymentId: string,

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



const createOrderBody = {
  type: "object",
  properties: {
    name: {
      type: "string",
      example: "birendra",
    },
    phone: {
      type: "string",
      example: "8757742000",
    },
    house: {
      type: "string",
      example: "nautan",
    },
    city: {
      type: "string",
      example: "bettiah",
    },
    state: {
      type: "string",
      example: "bihar",
    },
    pincode: {
      type: "number",
      example: 875754,
    },
  },
};




const cancelProductInOrderBody = {
  type: "object",
  properties: {
    productId: {
      type: "string",
      example: "65113885ebf4076b07976269",
    },
  },
};

module.exports = {
  createOrderBody,
  createOrder,
  getOrder,
  getOrderById,
  cancelProductInOrderBody,
  cancelProductInOrder,
  cancelOrder
};
