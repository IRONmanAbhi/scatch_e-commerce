const userModel = require("../models/user");
const {
  hashPassword,
  generateToken,
  comparePassword,
} = require("../utils/utilFunctions");

const registerUser = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user)
      return res.status(504).send("You already have an account please login");

    let hash = await hashPassword(password);

    user = await userModel.create({
      fullname,
      email,
      password: hash,
    });
    return res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });

    if (!user) return res.status(401).send("Invalid password or email");
    const comp = await comparePassword(password, user.password);
    if (comp) {
      let token = generateToken(user);
      res.cookie("token", token);
      res.status(200).send("user logged in successfully");
    } else res.status(401).send("Invalid password or email");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const logoutUser = async (req, res) => {
  res.cookie("token", "");
  res.status(200).send("user logged out successfully");
};

module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;
module.exports.logoutUser = logoutUser;
