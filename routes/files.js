const express = require("express");
const router = express.Router();
const { getFile } = require("../controllers/files");

router.get("/:id", getFile);

module.exports = router;
