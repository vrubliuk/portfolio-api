require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");
const authMiddleware = require("../middleware/auth");
const { postProject, putProject, putProjectScreenshot, deleteProject, deleteProjectScreenshot } = require("../controllers/projects");
const { storage } = require("../helpers/gridFsStorage");

router.post("/", authMiddleware, postProject);
router.put("/:id", authMiddleware, putProject);
router.put(
  "/:id/screenshot",
  authMiddleware,
  multer({
    fileFilter: (req, file, cb) => {
      const typeIsCorrect = file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png";
      cb(null, typeIsCorrect);
    },
    storage: storage()
  }).single("screenshot"),
  putProjectScreenshot
);
router.delete("/:id", authMiddleware, deleteProject);
router.delete("/:id/screenshot", authMiddleware, deleteProjectScreenshot);

module.exports = router;
