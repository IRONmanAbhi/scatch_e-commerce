const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const { verifyToken } = require("../utils/utilFunctions");

const isLoggedIn = async (req, res, next) => {
  if (!req.cookies.token) {
    req.flash("error", "You need to login First");
    return res.redirect("/");
  }
  try {
    let decoded = verifyToken(req.cookies.token);
    console.log(decoded);

    let user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");
    console.log(user);

    req.user = user;
    next();
  } catch (err) {
    req.flash("error", "Something went wrong");
    return res.redirect("/");
  }
};

module.exports = isLoggedIn;
