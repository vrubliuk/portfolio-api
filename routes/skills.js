const express = require("express");
const router = express.Router();
const { postSkill, putSkill, deleteSkill } = require("../controllers/skills");

router.post("/", postSkill);

router.put("/:id", putSkill);

router.delete("/:id", deleteSkill);

module.exports = router;
