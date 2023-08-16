// const stripe = require("stripe")(
//   "sk_test_51NdRYtSD97XjtBD2OyoG1tyUGQIO1Mt4StlzIjMwINUdD5DSjXO7Q0c3KuTPEcN4BtkvAQevpJgY7ftlSnVGdCdu008pNOAnIs"
// );

// const createPaymentIntent = async (req, res) => {
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: req.body.amount,
//       currency: "usd",
//     });

//     res.json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while creating payment intent." });
//   }
// };

// module.exports = {
//   createPaymentIntent,
// };




// const express = require("express");
// const router = express.Router();
// const asyncHandler = require("express-async-handler");
// app = express();
const stripe = require("stripe")("sk_test_51NdRYtSD97XjtBD2OyoG1tyUGQIO1Mt4StlzIjMwINUdD5DSjXO7Q0c3KuTPEcN4BtkvAQevpJgY7ftlSnVGdCdu008pNOAnIs");
// const orderStatus = require("../orderStatus");
const orderModel = require("../model/orderModel");

// post("/payment


const payment = async (req, res, next) => {
  try {
console.log(req.body)
    let session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: "INR",
          product_data: {
            name: item.productId.title,
            images: item.productId.images
          },
          unit_amount: item.productId.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "http://192.168.1.64:4200/success",
      cancel_url: "http://192.168.1.64:4200/failed",
    });
    let order = await orderModel.findOne({
      items: req.body.items,
      // status: orderStatus.NEW,
    });
    if (order) {
      order.checkout_id = session.id;
      await order.save();
    }
    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
}

const paymentStatus =  async (req, res) => {
  try {
    const c_id = req.body.id;
    console.log(req.body);
    let session = await stripe.checkout.sessions.retrieve(c_id);
    console.log("session", session.payment_status);
    let paymentIntent = "";
    if (session.payment_intent) {
      paymentIntent = await stripe.paymentIntents.retrieve(
        session.payment_intent
      );
      console.log("paymentIntent.status", paymentIntent.status);
      paymentIntent = paymentIntent.status;
    } else {
      paymentIntent = "payment_failed";
    }
    let order = await orderModel.findOne({ checkout_id: c_id });
    if (order) {
      order.status = paymentIntent;
      await order.save();
    }

    res.status(200).json(paymentIntent);
    // res.send("hello aashish");
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  paymentStatus,
  payment,
};