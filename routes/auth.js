const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { body } = require("express-validator/check");
const { logIn, session } = require("../controllers/auth");

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

router.get("/session", authMiddleware, session);

module.exports = router;
