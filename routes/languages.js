const express = require("express");
const router = express.Router();
const { body } = require("express-validator/check");
const languagesController = require("../controllers/languages");

router.post(
  "/language",
  [
    body("name").isAlpha(),
    body("level").isAlpha(),
    body("priority").isNumeric()
  ],
  languagesController.postLanguage
);

module.exports = router;
