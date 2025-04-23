const SSLCommerzPayment = require("sslcommerz-lts");
const orderModel = require("../model/order.model");
const cartModel = require("../model/cart.model");
const store_id = " brfas68008452267ae";
const store_passwd = "brfas68008452267ae@ssl";
const is_live = false; //true for live, false for sandbox

/**
 * Place Order
 */
const placeOrder = async (req, res) => {
  const { user, address, city, phone, cartItems, grandTotal, paymentMethod } =
    req.body;

  if (user && address && city && phone && cartItems && grandTotal) {
    try {
      let transactionID = Date.now();

      let order = new orderModel({
        user,
        address,
        city,
        phone,
        cartItems,
        grandTotal,
        transactionID,
        paymentMethod,
      });

      await order.save();

      const data = {
        total_amount: grandTotal,
        currency: "BDT",
        tran_id: transactionID, // use unique tran_id for each api call
        success_url: `http://localhost:5000/api/v1/order/success/${order._id}`,
        fail_url: "http://localhost:5000/api/v1/order//fail",
        cancel_url: "http://localhost:3030/cancel",
        ipn_url: "http://localhost:3030/ipn",
        shipping_method: "Courier",
        product_name: "Computer.",
        product_category: "Electronic",
        product_profile: "general",
        cus_name: user,
        cus_email: user,
        cus_add1: address,
        cus_add2: address,
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: "01711111111",
        cus_fax: "01711111111",
        ship_name: "Customer Name",
        ship_add1: "Dhaka",
        ship_add2: "Dhaka",
        ship_city: "Dhaka",
        ship_state: "Dhaka",
        ship_postcode: 1000,
        ship_country: "Bangladesh",
      };

      if (paymentMethod === "COD") {
        return res.status(201).send({
          success: true,
          msg: "Order Placed by COD",
          order,
        });
      } else if (paymentMethod === "online") {
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        let paymentResponce = await sslcz.init(data);

        return res.status(201).send({
          success: true,
          msg: "Order Placed",
          order,
          response: paymentResponce.GatewayPageURL,
        });
      }
    } catch (error) {
      return res.status(500).send({
        success: false,
        msg: "Server Error",
        error,
      });
    }
  } else {
    return res.status(400).send({
      success: false,
      msg: "Order Not Placed",
    });
  }
};

/**
 * success Response from SSL
 */
const successResponse = async (req, res) => {
  const { id } = req.params;
  let targetOrder = await orderModel.findOneAndUpdate(
    { _id: id },
    { paymentStatus: "paid" }
  );

  targetOrder.cartItems.map(async (item) => {
    await cartModel.findOneAndDelete({ _id: item.cartID });
  });

  res.redirect("http://localhost:5173/success");
};
/**
Fail Response from SSL
 */
const failResponse = async (req, res) => {
  res.redirect("http://localhost:5173/fail");
};
module.exports = { placeOrder, successResponse, failResponse };
