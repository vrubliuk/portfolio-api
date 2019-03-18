const express = require("express");
const router = express.Router();
const { body } = require("express-validator/check");
const languageController = require("../controllers/language");

router.post(
  "/language",
  [
    body("name").isAlpha(),
    body("level").isAlpha(),
    body("priority").isNumeric()
  ],
  languageController.postLanguage
);

module.exports = router;
