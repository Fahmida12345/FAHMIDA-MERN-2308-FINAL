const {
  userRegistration,
  userLogin,
  otpEmailVerify,
  resendOTP,
} = require("../controllers/auth.controller");
const router = require("express").Router();

router.post("/auth/login", userLogin);

//http://localhost:5000/api/v1/auth/register
router.post("/auth/register", userRegistration);

//http://localhost:5000/api/v1/auth/otpEmailVerify
router.post("/auth/otpEmailVerify", otpEmailVerify);

//http://localhost:5000/api/v1/auth/resendOTP
router.post("/auth/resendOTP", resendOTP);

module.exports = router;
