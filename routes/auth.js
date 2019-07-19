const express = require("express");
const router = express.Router();
const { logIn } = require("../controllers/auth");

router.post("/login", logIn);

module.exports = router;
