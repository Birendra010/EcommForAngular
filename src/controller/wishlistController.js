const userModel = require("../model/userModel")
const productModel = require("../model/productModel")
const wishlistModel = require("../model/wishlistModel")


const addToWishlist = async function (req, res) {
    try {
        let userId = req.user.userId;
        let productId = req.body.productId
        let product = await productModel.findById(productId);
        if (!product) {
            return res.status(400).send({ status: false, message: " invalid productId " });
        }
        let user = await userModel.findById(userId);
        if (!user) {
            return res.status(400).send({ status: false, message: "invalid userId and token " });
        }

        let userWishlist = await wishlistModel.findOne({ userId });
        if (!userWishlist) {
            let wishlist = await wishlistModel.create({ userId, products: [productId] });
            return res.status(201).send({ status: true, message: "Added to wishlist", wishlist});
        } else {
            let products = userWishlist.products;
            let previouslyAdded = products.findIndex((x) => x == productId);
            if (previouslyAdded !== -1) {
                return res.status(400).send({ status: false, message: "This product is already in your wishlist" });
            }
            products.push(productId);
            let wishlist = await wishlistModel.findByIdAndUpdate(userWishlist._id, { $set: { products: products } },
                { new: true }).populate("products");
            return res.status(201).send({ status: true, message: " Added to wishlist", wishlist });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    };

}


const getWishlist = async function (req, res) {
  try {
    let userId = req.user.userId;

    //checking if the userWishlist exist with this userId or not
    let userWishlist = await wishlistModel.findOne({ userId }).populate("products");
    return res.status(200).send({status: true, message: "Success", wishlist: userWishlist });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};


// const updateWishlist = async function (req, res) {
//     try {
//         let userId = req.user.userId;
//         let productId = req.body.productId;
//         console.log("product_id",productId);

// // console.log(productId);        
//         let wishlistCart = await wishlistModel.findOne({ userId });
//         // console.log(wishlistCart.products);
//         let item = wishlistCart.products.findIndex((item) => item._id.toString() == productId.toString());

//         // console.log(item);
//         if (item === -1) {
//             return res.status(404).send({ status: false, message: "this product not found in your wishlist" });

//         } else {
//             wishlistCart.products.splice(item, 1);
//             let wishlist = await wishlistModel.findByIdAndUpdate(wishlistCart._id,  {
//                 new: true
//             }).populate("products");
//             console.log(wishlist);
//             return res.status(200).send({status:true , message:"wishlist updated" , wishlist})
//         }
//     } catch (error) {
//       return res.status(500).send({status:false , error:error.message})  
//     }
// }




const removeFromWishlist = async (req, res) => {
  try {
    let userId = req.user.userId;
    let productId = req.body.productId;
    let userWishlist = await wishlistModel.findOne({ userId: userId });
    let filteredList = userWishlist.products.filter(
      (x) => x.toString() !== productId.toString()
    );
    // console.log(filteredList);
    let wishlist = await wishlistModel
      .findByIdAndUpdate(
        userWishlist._id,
        { $set: { products: filteredList } },
        { new: true }
      )
      .populate("products");
    return res.status(200).send({ status: true, wishlist });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};






module.exports = { addToWishlist, getWishlist, removeFromWishlist };

























// const catchAsyncError = require("../middlewares/catchAsyncError");
// const ErrorHandler = require("../utils/errorHandler");
// const wishModel = require("../models/wishModel");

// // create a cart
// exports.createWishList = catchAsyncError(async (req, res, next) => {
//   let productId = req.body.productId;
//   let userId = req.user.id;
//   let userWish = await wishModel.findOne({ userId: userId });
//   let item = userWish.productId.findIndex(
//     (item) => item._id.toString() == productId.toString()
//   );
//   if (item !== -1) {
//     return next(new ErrorHandler("Item already Present in Wishlist", 400));
//   }
//   if (!userWish) {
//     const wishDetails = {
//       userId,
//       productId,
//     };
//     let newCart = await wishModel.create(wishDetails);
//     return res
//       .status(201)
//       .send({ status: true, msg: " Added to WishList", cart: newCart });
//   } else {
//     userWish.productId.push(productId);
//     userWish.save();
//     return res.status(200).send({
//       status: true,
//       msg: "Item Added to WishList",
//       wishList: userWish,
//     });
//   }
// });

// //update cart
// exports.updateWishListById = catchAsyncError(async (req, res, next) => {
//   let userId = req.user.id;
//   let { productId } = req.body;
//   let wishCart = await wishModel.findOne({ userId });
//   let item = wishCart.productId.findIndex(
//     (item) => item._id.toString() == productId.toString()
//   );
//   if (item === -1) {
//     return res
//       .status(404)
//       .send({ status: false, msg: "This product not found in your Wish list" });
//   } else {
//     wishCart.productId.splice(item, 1);
//     let wishList = await wishModel
//       .findByIdAndUpdate(wishCart._id, wishCart, {
//         new: true,
//       })
//       .populate("productId");
//     return res
//       .status(200)
//       .send({ status: true, msg: "wishlist updated", wishList });
//   }
// });

// //get wish details by id
// exports.getWishListById = catchAsyncError(async (req, res, next) => {
//   const userId = req.user.id;
//   const wishList = await wishModel
//     .findOne({ userId: userId })
//     .populate("productId");
//   res.status(200).json({
//     status: true,
//     message: "Success",
//     wishList,
//   });
// });