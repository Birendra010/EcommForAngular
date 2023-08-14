const stripe = require("stripe")(
  "sk_test_51NdRYtSD97XjtBD2OyoG1tyUGQIO1Mt4StlzIjMwINUdD5DSjXO7Q0c3KuTPEcN4BtkvAQevpJgY7ftlSnVGdCdu008pNOAnIs"
);

const createPaymentIntent = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating payment intent." });
  }
};

module.exports = {
  createPaymentIntent,
};
