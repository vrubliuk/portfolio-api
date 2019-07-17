const express = require("express");
const router = express.Router();
const { postEducation, putEducation, deleteEducation } = require("../controllers/educations");

router.post("/", postEducation);

router.put("/:id", putEducation);

router.delete("/:id", deleteEducation);

module.exports = router;
