const checkEmail = require("../helpers/checkEmail");
const emailSend = require("../helpers/emailSend");
const generateOTP = require("../helpers/generateOTP");
const authModel = require("../model/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//userRegistration
const userRegistration = async (req, res) => {
  const { name, email, address, password, role } = req.body;

  if (name && email && password) {
    if (checkEmail(email)) {
      let existEmail = await authModel.findOne({ email });
      if (existEmail) {
        return res.status(404).send({
          success: false,
          msg: "Email Already Exist",
        });
      }
      try {
        bcrypt.hash(
          password,
          parseInt(process.env.saltRounds),
          async function (err, hash) {
            if (!err) {
              let OTP = generateOTP();
              let user = new authModel({
                name,
                email,
                password: hash,
                address,
                role,
                otp: OTP,
              });
              await user.save();

              await emailSend(email, OTP);
              // set timeout
              setTimeout(async () => {
                user.otp = null;
                await user.save();
              }, 60000); //  1 minute thakbe

              res.status(201).send({
                msg: "User Created",
                success: true,
                user,
              });
            } else {
              res.status(500).send({
                success: false,
                msg: "Internal Server Error",
              });
            }
          }
        );
      } catch (error) {
        //500 server error
        res.status(500).send({
          success: false,
          msg: "Internal Server Error",
        });
      }
    } else {
      res.status(404).send({
        success: false,
        msg: "Invalid Error",
      });
    }
  } else {
    //Client error
    res.status(404).send({
      success: false,
      msg: "All Fields are required",
    });
  }
};

//userLogin
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    if (checkEmail(email)) {
      let existUser = await authModel.findOne({ email });
      if (existUser) {
        bcrypt.compare(password, existUser.password).then(function (result) {
          if (result) {
            let user = {
              id: existUser._id,
              name: existUser.name,
              email: existUser.email,
              role: existUser.role,
            };
            if (existUser.role == "admin") {
              let token = jwt.sign(user, process.env.JWT_SECRET, {
                expiresIn: "1h",
              });
              res.cookie("token", token, {
                //httpOnly: true,
                secure: false,
              });

              res.status(200).send({
                success: true,
                msg: "Admin User Found",
                user,
                token,
              });
            } else if (existUser.role == "user") {
              let token = jwt.sign(user, process.env.JWT_SECRET, {
                expiresIn: "1d",
              });
              res.cookie("token", token, {
                secure: false,
                //httpOnly: true,
              });
              res.status(200).send({
                msg: "Normal User Found",
                success: true,
                user,
                token,
              });
            }
          } else {
            res.status(404).send({
              success: false,
              msg: "Credential error!",
            });
          }
        });
      } else {
        res.status(404).send({
          success: false,
          msg: "Credential error!",
        });
      }
    } else {
      res.status(404).send({
        success: false,
        msg: "All Fields are required",
      });
    }
  }
};

// otp verification
const otpEmailVerify = async (req, res) => {
  const { email, otp } = req.body;
  const existEmail = await authModel.findOne({ email });

  // email exist or not check

  if (existEmail) {
    if (existEmail.otp == otp) {
      existEmail.isVerified = true;

      await existEmail.save();
      res.status(200).send({
        success: true,
        msg: "OTP verified",
      });
    } else {
      res.status(404).send({
        success: false,
        msg: "OTP Invalid!",
      });
    }
  } else {
    res.status(404).send({
      success: false,
      msg: "Email not found!",
    });
  }
};

// resend otp
const resendOTP = async (req, res) => {
  const { email } = req.body;
  const existEmail = await authModel.findOne({ email });

  if (existEmail) {
    let otp = generateOTP();
    existEmail.otp = otp;
    await existEmail.save();

    await emailSend(email, otp, (resend = true));
    // set timeout
    setTimeout(async () => {
      existEmail.otp = null;
      await existEmail.save();
    }, 60000);
    res.status(200).send({
      success: true,
      msg: "OTP Resend",
    });
  } else {
    res.status(404).send({
      success: false,
      msg: "Email not found!",
    });
  }
};
module.exports = { userRegistration, userLogin, otpEmailVerify, resendOTP };
