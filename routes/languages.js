const express = require("express");
const router = express.Router();
const { body } = require("express-validator/check");
const { postLanguage, deleteLanguage } = require("../controllers/languages");

router.post("/", [body("name").isAlpha(), body("level").isAlpha(), body("priority").isNumeric()], postLanguage);

router.delete("/:id", deleteLanguage);

module.exports = router;
