const cartModel = require("../model/cart.model");

/**Get all Cart
 */
const allCart = async (req, res) => {
  try {
    let carts = await cartModel.find().populate("userId").populate("product");
    res.status(200).send({
      success: true,
      msg: "All Cart",
      data: carts,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      msg: "No cart found!",
      error,
    });
  }
};
/**Get singleUserCart
 */
const singleUserCart = async (req, res) => {
  const { id } = req.params;
  try {
    let carts = await cartModel
      .find({ userId: id })
      .populate("userId")
      .populate("product");
    res.status(200).send({
      success: true,
      msg: "All Cart",
      data: carts,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      msg: "No cart found!",
      error,
    });
  }
};

const addCart = async (req, res) => {
  const { userId, product } = req.body;
  if (userId && product) {
    let existCart = await cartModel.findOne({ userId, product });

    if (existCart) {
      existCart.quantity++;
      await existCart.save();
      res.status(200).send({
        success: true,
        msg: "Cart Updated!",
        data: existCart,
      });
    } else {
      let newCart = new cartModel({ userId, product });
      await newCart.save();
      res.status(200).send({
        success: true,
        msg: "Cart Added!",
        data: newCart,
      });
    }
  } else {
    res.status(400).send({
      success: false,
      msg: "Insufficient Data!",
    });
  }
};

const incrementCart = async (req, res) => {
  const { id } = req.params;
  try {
    let targetCart = await cartModel.findOne({ _id: id });
    targetCart.quantity++;
    await targetCart.save();
    res.status(200).send({
      success: true,
      msg: "Cart Updated!",
      data: targetCart,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      msg: "No cart Found!",
    });
  }
};
const decrementCart = async (req, res) => {
  const { id } = req.params;
  try {
    let targetCart = await cartModel.findOne({ _id: id });
    if (targetCart.quantity > 1) {
      targetCart.quantity--;
      await targetCart.save();

      res.status(200).send({
        success: true,
        msg: "Cart Updated!",
        data: targetCart,
      });
    } else {
      res.status(400).send({
        success: false,
        msg: "Minimum Quantity is 1",
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      msg: "No cart Found!",
    });
  }
};
/**remove to Cart
 */
const removeCart = async (req, res) => {
  const { id } = req.params;
  try {
    let targetCart = await cartModel.findOneAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      msg: "Cart Removed!",
      data: targetCart,
    });
  } catch (error) {
    res.status(400).send({
      success: true,
      msg: "No Cart Found!",
    });
  }
};
module.exports = {
  addCart,
  singleUserCart,
  incrementCart,
  decrementCart,
  removeCart,
  allCart,
};
