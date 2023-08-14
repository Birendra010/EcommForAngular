const { default: mongoose } = require("mongoose");
const cartModel = require("../model/cartModel");
const orderModel = require("../model/orderModel");
const productModel = require("../model/productModel");
const ObjectId = mongoose.Types.ObjectId;

const createOrder = async (req, res) => {
  try {
    let userId = req.user.userId;
    let { name, phone, house, city, state, pincode, productId } = req.body;

    //////input validation
    let cartDetail = await cartModel
      .findOne({ userId })
      .populate("items.productId", "stock");
    // console.log(cartDetail);
    if (!cartDetail) {
      return res
        .status(404)
        .send({ status: false, message: " cart not found" });
    }
    // console.log(cartDetail.items.length);
    if (cartDetail.items.length === 0) {
      return res
        .status(400)
        .send({ status: false, message: " add  items in cart to place order" });
    }
    const filter = cartDetail.items.filter(
      (i) => i.quantity > i.productId.stock
    );
    if (filter.length > 0) {
      return res.status(404).send({
        status: false,
        message: " out of stock",
        filter,
      });
    }
    let order = {
      userId,
      items: cartDetail.items,
      totalPrice: cartDetail.totalPrice,
      totalItems: cartDetail.totalItems,
      poducts: cartDetail.items,

      shippingInfo: {
        name: name,
        phone: phone,
        address: {
          house: house,
          city: city,
          state: state,
          pincode: pincode,
        },
      },
    };
    let crearedata = await orderModel.create(order);

    cartDetail.items.forEach(async (item) => {
      await productModel.findByIdAndUpdate(
        item.productId._id,
        { $inc: { stock: -item.quantity } },
        { new: true }
      );
    });
    await cartModel.findByIdAndUpdate(cartDetail._id, {
      $set: { items: [], totalPrice: 0, totalItems: 0 },
    });
    return res.status(201).send({
      status: true,
      message: "order placed successfully",
      data: crearedata,
    });
  } catch (err) {YOUR_SERVER_ENDPOINT;
    res.status(500).send({ status: false, error: err.message });
  }
};

const getOrder = async function (req, res) {
  try {
    let userId = req.user.userId;
    //checking if the cart exist with this userId or not
    let findOrder = await orderModel
      .find({ userId: userId, status: "pending" })
      .populate("items.productId");

    if (!findOrder)
      return res
        .status(404)
        .send({ status: false, message: `No cart found with given userId` });

    return res
      .status(200)
      .send({ status: true, message: "Success", data: findOrder });
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    let userId = req.user.userId;
    let orderId = req.params.orderId;
    let order = await orderModel
      .findOne({
        _id: orderId,
        userId,
        status: { $in: ["pending", "delivered"] },
      })
      .populate("items.productId");
    if (!order) {
      return res
        .status(404)
        .send({ status: false, msg: "You have not completed any order" });
    }
    return res.status(200).send({ status: true, msg: "Order details", order });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const cancelProductInOrder = async (req, res) => {
  try {
    let { productId } = req.body;
    let orderId = req.params.orderId;
    let userId = req.user.userId;
    if (!orderId) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide orderId" });
    }
    if (!ObjectId.isValid(orderId)) {
      return res.status(400).send({ status: false, msg: "invlid orderId" });
    }
    if (!productId) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide productId" });
    }
    if (!ObjectId.isValid(productId)) {
      return res.status(400).send({ status: false, msg: "invlid productId" });
    }
    let userOrder = await orderModel.findById(orderId);
    if (!userOrder) {
      return res
        .status(404)
        .send({ status: false, msg: "order not found with this id" });
    }

    if (userId.valueOf() != userOrder.userId.valueOf()) {
      return res.status(403).send({
        status: false,
        msg: "Forbidden you have not access to update this",
      });
    }
    if (userOrder.status !== "pending") {
      return res
        .status(400)
        .send({ status: false, msg: "Order cannot be updated" });
    }
    let product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).send({ status: false, msg: "productId invalid" });
    }
    if (userOrder.items.length === 0) {
      return res
        .status(400)
        .send({ status: false, msg: "your order is already empty" });
    }
    // get quantity of removed product
    let quantity = 0;
    userOrder.items.map((x) => {
      if (x.productId.valueOf() === productId) {
        quantity = x.quantity;
      }
    });
    let filteredProducts = userOrder.items.filter(
      (x) => x.productId.valueOf() !== productId
    );

    if (filteredProducts.length === userOrder.items.length) {
      return res
        .status(404)
        .send({ status: false, msg: "given product not found in your order" });
    }

    product.stock += quantity;
    await product.save();
    let updatedData = {};

    // if no products left after filteration
    if (filteredProducts.length === 0) {
      (updatedData = filteredProducts),
        (updatedData.totalItems = userOrder.items.totalItems - quantity),
        (updatedData.totalPrice =
          userOrder.items.totalPrice - product.price * quantity);
      let order = await orderModel.findByIdAndUpdate(
        orderId,
        { $set: { items: updatedData, status: "canceled" } },
        { new: true }
      );
      return res
        .status(200)
        .send({ status: true, msg: "order cancled", order });
    } else {
      (updatedData = filteredProducts),
        (updatedData.totalItems = userOrder.items.totalItems - quantity),
        (updatedData.totalPrice =
          userOrder.items.totalPrice - product.price * quantity);
      userOrder.items.forEach(async (product) => {
        let pro = await productModel.findByIdAndUpdate(
          product._id,
          { $inc: { stock: +product.quantity } },
          { new: true }
        );
        console.log(pro);
      });
      const order = await orderModel
        .findByIdAndUpdate(
          orderId,
          { $set: { items: updatedData } },
          { new: true }
        )
        .populate("items.productId");
      return res
        .status(200)
        .send({ status: true, msg: "product cancled", order });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// const cancelOrder = async function (req, res) {
//   try {
//     let userId = req.user.userId;
//     let data = req.body;
//     let { productId } = data;
//     let orderDetails = await orderModel
//       .findOne({ userId, status: "pending" })
//       .populate("items.productId");
//     if (!orderDetails) {
//       return res
//         .status(400)
//         .send({ success: false, message: "items cenceled already" });
//     }
//     orderDetails.items.forEach(async (item) => {
//       await productModel.findByIdAndUpdate(
//         item.productId,
//         { $inc: { stock: +item.quantity } },
//         { new: true }
//       );
//     });
//     let orderStatus = await orderModel.findByIdAndUpdate(
//       orderDetails._id,
//       { $set: { status: "cancelled" } },
//       { new: true }
//     );
//     return res
//       .status(200)
//       .send({ status: true, message: "Success", data: orderStatus });
//   } catch (error) {
//     return res.status(500).send({ status: false, error: error.message });
//   }
// };

const cancelOrder = async (req, res) => {
  try {
    let orderId = req.params.orderId;
    let userId = req.user.userId;
    if (!orderId) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide orderId" });
    }
    if (!ObjectId.isValid(orderId)) {
      return res.status(400).send({ status: false, msg: "invlid orderId" });
    }
    let userOrder = await orderModel.findById(orderId);

    if (userId.valueOf() != userOrder.userId.valueOf()) {
      return res
        .status(403)
        .send({
          status: false,
          msg: "Forbidden you have not access to update this",
        });
    }
    if (userOrder.status !== "pending") {
      return res
        .status(400)
        .send({ status: false, msg: "Order cannot be cancel" });
    }
    userOrder.items.forEach(async (product) => {
      await productModel.findByIdAndUpdate(
        product.productId,
        { $inc: { stock: +product.quantity } },
        { new: true }
      );
    });
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { $set: { status: "canceled" } },
      { new: true }
    );
    return res.status(200).send({ status: true, msg: "order cancled", order });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrder,
  cancelOrder,
  cancelProductInOrder,
  getOrderById,
};
