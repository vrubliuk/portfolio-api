const express = require("express");
const router = express.Router();
const { body } = require("express-validator/check");
const { getUser, postUser, putUser } = require("../controllers/users");
const User = require("../models/user");

router.get("/:id", getUser);

router.post(
  "/",
  [
    body("login")
      .custom(async login => {
        const user = await User.findOne({ login });
        if (user) throw new Error("This login is already in use.");
        return true;
      })
      // .withMessage("This login is already in use.")
      .trim(),
    body("password", "The password should be at least 6 characters long.")
      .isLength({ min: 6 })
      .trim()
  ],
  postUser
);

router.put("/:id", putUser);

module.exports = router;
