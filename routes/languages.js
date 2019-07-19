const express = require("express");
const router = express.Router();
const { postLanguage, putLanguage, deleteLanguage } = require("../controllers/languages");

router.post("/", postLanguage);

router.put("/:id", putLanguage);

router.delete("/:id", deleteLanguage);

module.exports = router;
