const {
  placeOrder,
  successResponse,
  failResponse,
} = require("../controllers/order.controller");

const router = require("express").Router();

router.post("/order/place", placeOrder);
router.post("/order/success/:id", successResponse);
router.post("/order/fail", failResponse);

module.exports = router;
