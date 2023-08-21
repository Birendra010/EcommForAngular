
const stripe = require("stripe")("sk_test_51NdRYtSD97XjtBD2OyoG1tyUGQIO1Mt4StlzIjMwINUdD5DSjXO7Q0c3KuTPEcN4BtkvAQevpJgY7ftlSnVGdCdu008pNOAnIs");

const orderModel = require("../model/orderModel");




const payment = async (req, res, next) => {
  try {

    let items = req.body.items
    let session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.items.items.map((item) => ({
        price_data: {
          currency: "INR",
          product_data: {
            name: item.productId.title,
            images: item.productId.images,
          },
          unit_amount: item.productId.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "http://192.168.1.64:4200/success",
      cancel_url: `${process.env.HOST_URL}/failed`,
    });
    if (req.body.form.email) {
      let order = await orderModel.findOne({
        email: req.body.form.email,
        paymentStatus: "payment_pending",
      });

      if (order) {
        order.paymentId = session.id;
    
        await order.save();
      }
    } else {
      let order = await orderModel.findOne({
        userId: items.userId,
        paymentStatus :"payment_pending"
        // items: req.body.items,
        // status: orderStatus.NEW,
      });
      if (order) {
        order.paymentId = session.id;
        await order.save();
      }
    }
    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
}

const paymentStatus =  async (req, res) => {
  try {
    const c_id = req.body.id;

    let session = await stripe.checkout.sessions.retrieve(c_id);
    // console.log("session", session.payment_status);
    let paymentIntent = "";
    if (session.payment_intent) {
      paymentIntent = await stripe.paymentIntents.retrieve(
        session.payment_intent
      );
      paymentIntent = paymentIntent.status;
    } else {
      paymentIntent = "payment_failed";
    }
    let order = await orderModel.findOne({ paymentId: c_id });
    // console.log(order);
    if (order) {
      order.paymentStatus = paymentIntent;
      await order.save();
    }

    res.status(200).json({paymentIntent : paymentIntent , orderId : order._id});
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  paymentStatus,
  payment,
};

