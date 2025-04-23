const {
  singleCategory,
  getAllCategory,
  createNew,
  deleteCategory,
  categoryUpdate,
} = require("../controllers/category.controller");
const router = require("express").Router();

const checkAdminMiddleware = require("../middleware/checkAdminMiddleware");
const upload = require("../middleware/fileUploadMiddleware");

// http://localhost:5000/api/v1/category/all/
router.get("/category/all", getAllCategory);

// http://localhost:5000/api/v1/category/single/:id
router.get("/category/single/:id", singleCategory);

// http://localhost:5000/api/v1/category/createnew
router.post(
  "/category/createnew",
  checkAdminMiddleware,
  upload.single("image"),
  createNew
);

// http://localhost:5000/api/v1/category/update/:id
router.patch(
  "/category/update/:id",
  checkAdminMiddleware,
  upload.single("image"),
  categoryUpdate
);

// http://localhost:5000/api/v1/category/delete/:id
router.delete("/category/delete/:id", checkAdminMiddleware, deleteCategory);

module.exports = router;
