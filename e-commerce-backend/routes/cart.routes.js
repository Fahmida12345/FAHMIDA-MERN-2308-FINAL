const router = require("express").Router();

const {
  addCart,
  removeCart,
  allCart,
  singleUserCart,
  incrementCart,
  decrementCart,
} = require("../controllers/cart.controller");
const checkAdminMiddleware = require("../middleware/checkAdminMiddleware");
const checkUserMiddleware = require("../middleware/checkUserMiddleware");

/**
 * All cart
 * http://localhost:5000/api/v1/cart/all/:id
 */
router.get("/cart/all", checkAdminMiddleware, allCart);
/**
 * Single User Cart cart
 * http://localhost:5000/api/v1/cart/single/:id
 */
router.get("/cart/single/:id", checkUserMiddleware, singleUserCart);
/**
 * Add to cart
 * http://localhost:5000/api/v1/cart/add
 */
router.post("/cart/add", checkUserMiddleware, addCart);

/**
 * inceament to cart
 * http://localhost:5000/api/v1/cart/inceament/:id
 */
router.patch("/cart/increment/:id", checkUserMiddleware, incrementCart);

/**
 * decreament to cart
 * http://localhost:5000/api/v1/cart/decreament/:id
 */
router.patch("/cart/decrement/:id", checkUserMiddleware, decrementCart);
/**
 * remove to cart
 * http://localhost:5000/api/v1/cart/remove/:id
 */
router.delete("/cart/remove/:id", checkUserMiddleware, removeCart);

module.exports = router;
