const fs = require("fs");

const deleteFile = (file) => {
  return new Promise((resolve, reject) => {
    fs.unlink(file, (err) => {
      if (err) {
        resolve();
      } else {
        resolve();
      }
    });
  });
};

module.exports = deleteFile;
