const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { postLanguage, putLanguage, deleteLanguage } = require("../controllers/languages");

router.post("/", authMiddleware, postLanguage);
router.put("/:id", authMiddleware, putLanguage);
router.delete("/:id", authMiddleware, deleteLanguage);

module.exports = router;
