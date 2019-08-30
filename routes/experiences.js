const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { postExperience, putExperience, deleteExperience } = require("../controllers/experiences");

router.post("/", authMiddleware, postExperience);
router.put("/:id", authMiddleware, putExperience);
router.delete("/:id", authMiddleware, deleteExperience);

module.exports = router;
