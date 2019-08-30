const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { postSkill, putSkill, deleteSkill } = require("../controllers/skills");

router.post("/", authMiddleware, postSkill);
router.put("/:id", authMiddleware, putSkill);
router.delete("/:id", authMiddleware, deleteSkill);

module.exports = router;
