const {
  addNewBanner,
  deleteBanner,
  getAllBanners,
} = require("../controllers/banner.controller");
const checkAdminMiddleware = require("../middleware/checkAdminMiddleware");
const upload = require("../middleware/fileUploadMiddleware");

const router = require("express").Router();

//http://localhost:5000/api/v1/banner/all
router.get("/banner/all", getAllBanners);

//http://localhost:5000/api/v1/banner/add
router.post(
  "/banner/add",
  checkAdminMiddleware,
  upload.single("image"),
  addNewBanner
);

//http://localhost:5000/api/v1/banner/delete/:id
router.delete("/banner/delete/:id", checkAdminMiddleware, deleteBanner);

module.exports = router;
