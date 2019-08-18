const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { postEducation, putEducation, deleteEducation } = require("../controllers/educations");

router.post("/", authMiddleware, postEducation);

router.put("/:id", authMiddleware, putEducation);

router.delete("/:id", authMiddleware, deleteEducation);

module.exports = router;
