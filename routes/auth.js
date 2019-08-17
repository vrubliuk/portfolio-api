const express = require("express");
const router = express.Router();
const { body } = require("express-validator/check");
const { logIn } = require("../controllers/auth");

router.post(
  "/login",
  [
    body("login", "The login is required")
      .trim()
      .not()
      .isEmpty(),
    body("password", "The password is required")
      .trim()
      .not()
      .isEmpty()
  ],
  logIn
);

module.exports = router;
