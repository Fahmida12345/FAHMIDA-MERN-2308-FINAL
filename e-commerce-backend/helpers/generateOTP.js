const generateOTP = () => {
  // console.log(Math.floor(1000 + Math.random() * 900000));
  return Math.floor(1000 + Math.random() * 900000);
};

module.exports = generateOTP;
