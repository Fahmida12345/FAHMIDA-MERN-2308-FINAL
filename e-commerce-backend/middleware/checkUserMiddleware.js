const jwt = require("jsonwebtoken");
const authModel = require("../model/auth.model");
const checkUserMiddleware = (req, res, next) => {
  //console.log("who are you?");
  let { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
      if (err) {
        res.status(505).send({
          success: false,
          msg: "Server Error",
          err,
        });
      } else {
        let user = await authModel.findOne({ email: decoded.email });

        if (user) {
          next();
        } else {
          res.status(404).send({
            success: false,
            msg: "User Not Found",
          });
        }
      }
      // console.log(decoded);
    });
  } else {
    res.status(404).send({
      success: false,
      msg: "Token Not Found",
    });
  }
};
module.exports = checkUserMiddleware;
