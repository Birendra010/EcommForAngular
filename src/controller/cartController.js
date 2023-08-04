
const productModel = require("../model/productModel")
const cartModel = require("../model/cartModel")
const {isValidBody,isValidId} = require("../validators/validator")



  const createCart = async function (req, res) {
    try {
      let userId = req.user.userId
      let data = req.body;
      if (isValidBody(data)) {
        return res.status(400).send({ status: false, message: "please provide request body" });
      }
      let { productId } = data;
      if (!isValidId(productId)) {
        return res.status(400).send({ status: false, message: "please provide valid product Id" });
      }
      let product = await productModel.findById(productId);
      if (!product) {
        return res.status(400).send({status: false,message: "this product is not found in product model"});
      }
        let userCart = await cartModel.findOne({ userId:userId });
        let cart={};
        if (!userCart) {
          cart.userId= userId
          cart.items =[{productId,quantity:1}]
          cart.totalItems = 1;
          cart.totalPrice = product.price
          const newCart = await cartModel.create(cart)
          return res.status(201).send({ status: false,message:"item added successfully",newCart });
        }
        let quantity = 1;
        let arr = userCart.items;
     
        let isExist = false;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].productId == productId) {
            isExist = true;
            arr[i].quantity += quantity;
          }
        }
        if (!isExist) {
          arr.push({ productId: productId, quantity: quantity });
        }
        cart.items= arr;
        let price = product.price;
        cart.totalPrice = userCart.totalPrice + (price * quantity)
        cart.totalItems = arr.length;
        let update = await cartModel.findByIdAndUpdate(userCart._id,cart,{new:true}) 
        return res.status(201).send({status: true,message: "item added successfully",data: update});
   
    } catch (err) {
      return res.status(500).send({ status: false, message: err.message });
    }
  }


  
  const getCartDetails = async function (req, res) {
    try {
      let userId = req.user.userId
  
      //checking if the cart exist with this userId or not
      let userCart = await cartModel
        .findOne({userId})
        
        .populate("items.productId")

  
      return res.status(200).send({ status: true, message: "Success", cart: userCart });
    } catch (err) {
       return res.status(500).send({ status: false, error: err.message });
    }
  };




const updateCart = async (req, res) => {
  try {
    let userId = req.user.userId;
    if (Object.keys(req.body).length !== 2) {
      return res.status(400).send({ status: false, message: "invlid request" });
    }
    let { productId, quantity } = req.body;
    if (!productId) {
      return res
        .status(400)
        .send({ status: false, message: "please provide productId" });
    }
    let product = await productModel.findById(productId);
    if (!product) {
      return res
        .status(404)
        .send({ status: false, message: "product not found with given Id" });
    }
    if (quantity > product.stock) {
      return res
        .status(404)
        .send({
          status: false,
          message: `maximum quantiy to buy is ${product.stock}`,
        });
    }
    let userCart = await cartModel.findOne({ userId });

    let item = userCart.items.findIndex(
      (item) => item.productId == productId
    );
    if (item === -1) {
      return res
        .status(404)
        .send({ status: false, message: "This product not found in your cart" });
    }
    let updatedCart = {};
    const cartItem = userCart.items[item];
    if (quantity < 1) {
      let totalItems = userCart.totalItems - cartItem.quantity;
      let totalPrice = userCart.totalPrice - cartItem.quantity * product.price;
      let cart = await cartModel
        .findByIdAndUpdate(
          userCart._id,
          {
            $pull: { items: { productId: productId } },
            $set: { totalItems, totalPrice },
          },
          { new: true }
        )
        .populate("items.productId");
      return res
        .status(200)
        .send({ status: true, message: "cart updated", cart: cart });
    } else if (quantity < cartItem.quantity) {
      updatedCart.items = userCart.items;
      updatedCart.totalItems = userCart.totalItems - 1;
      updatedCart.totalPrice =
        userCart.totalPrice +
        (quantity * product.price - cartItem.quantity * product.price);
      cartItem.quantity = quantity;
      let cart = await cartModel
        .findByIdAndUpdate(userCart._id, updatedCart, { new: true })
        .populate("items.productId");
      return res
        .status(200)
        .send({ status: true, message: "cart updated", cart: cart });
    } else {
      updatedCart.items = userCart.items;
      updatedCart.totalItems = userCart.totalItems + 1;
      updatedCart.totalPrice =
        userCart.totalPrice +
        (quantity * product.price - cartItem.quantity * product.price);
      cartItem.quantity = quantity;
      let cart = await cartModel
        .findByIdAndUpdate(userCart._id, updatedCart, { new: true })
        .populate("items.productId");
      return res
        .status(200)
        .send({ status: true, message: "cart updated", cart: cart });
    }
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};


  
  module.exports = { createCart, getCartDetails, updateCart };