const {
  addProduct,
  getAllProducts,
  getSingelProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/product.controller");
const checkAdminMiddleware = require("../middleware/checkAdminMiddleware");
const upload = require("../middleware/fileUploadMiddleware");

const router = require("express").Router();
// add product
//http://localhost:5000/api/v1/product/add
router.post(
  "/product/add",
  checkAdminMiddleware,
  upload.array("images"),
  addProduct
);
/**
 get All Products
 * http://localhost:5000/api/v1/product/all
 */
router.get("/product/all", getAllProducts);

/**get single Products
http://localhost:5000/api/v1/product/single/:id  
*/
router.get("/product/single/:id", getSingelProduct);

/**Delete Products
http://localhost:5000/api/v1/product/delete/:id
*/
router.delete("/product/delete/:id", checkAdminMiddleware, deleteProduct);

/**Update Products
 * 
http://localhost:5000/api/v1/product/update/:id
*/
router.patch(
  "/product/update/:id",
  checkAdminMiddleware,
  upload.array("images"),
  updateProduct
);

module.exports = router;
