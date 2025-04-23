const multer = require("multer");
//diskstorege
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload-image");
  },
  filename: function (req, file, cb) {
    let extantion = file.originalname.split(".");
    console.log(extantion);

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        `.${extantion[extantion.length - 1]}`
    );
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
