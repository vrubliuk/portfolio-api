const express = require("express");
const router = express.Router();
const { postExperience, putExperience, deleteExperience } = require("../controllers/experiences");

router.post("/", postExperience);

router.put("/:id", putExperience);

router.delete("/:id", deleteExperience);

module.exports = router;
