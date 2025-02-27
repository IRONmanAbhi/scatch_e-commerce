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
    if (user) {
      req.flash("error", "You already have an account please login");
      return res.redirect("/");
    }

    let hash = await hashPassword(password);

    user = await userModel.create({
      fullname,
      email,
      password: hash,
    });
    req.flash("error", "account created successfully, Please Login");
    return res.redirect("/");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });

    if (!user) {
      req.flash("error", "Invalid password or email");
      return res.redirect("/");
    }
    const comp = await comparePassword(password, user.password);
    if (comp) {
      let token = generateToken(user);
      res.cookie("token", token);
      res.redirect("/shop");
    } else {
      req.flash("error", "Invalid password or email");
      return res.redirect("/");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const logoutUser = async (req, res) => {
  res.cookie("token", "");
  req.flash("error", "user logged out successfully");
  res.redirect("/");
};

module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;
module.exports.logoutUser = logoutUser;
