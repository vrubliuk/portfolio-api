const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.logIn = async (req, res, next) => {
  const { login, password } = req.body;
  try {
    const user = await User.findOne({ login });
    if (!user) return res.status(500).send("Login doesn't exist");
    const passwordsAreEqual = await bcrypt.compare(password, user.password);
    res.json({
      passwordsAreEqual
    });
  } catch (error) {
    next(error);
  }
};
