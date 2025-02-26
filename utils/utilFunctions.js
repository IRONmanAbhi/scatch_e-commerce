const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (user) => {
  return jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY);
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports.generateToken = generateToken;
module.exports.hashPassword = hashPassword;
module.exports.comparePassword = comparePassword;
