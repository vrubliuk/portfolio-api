const express = require("express");
const router = express.Router();
const { getUser, postUser, putUser } = require("../controllers/users");

router.get("/:id", getUser);
router.post("/", postUser);
router.put("/:id", putUser);

module.exports = router;
