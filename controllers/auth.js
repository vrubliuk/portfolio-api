const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.logIn = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.statusCode = 422;
    return next(error);
  }
  const { login, password } = req.body;
  try {
    const user = await User.findOne({ login });
    if (!user) return res.status(401).json({ message: "The login doesn't exist" });
    const passwordsAreEqual = await bcrypt.compare(password, user.password);
    if (!passwordsAreEqual) return res.status(401).json({ message: "The password is not correct" });
    const token = jwt.sign(
      {
        userId: user._id.toString()
      },
      "portfolio-api",
      { expiresIn: "30m" }
    );
    res.json({
      token
    });
  } catch (error) {
    next(error);
  }
};
