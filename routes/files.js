const express = require("express");
const router = express.Router();
const { getResume, getFile } = require("../controllers/files");

router.get("/resume/:id", getResume);
router.get("/:id", getFile);

module.exports = router;
