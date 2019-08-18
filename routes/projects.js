const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const uniqid = require("uniqid");
const authMiddleware = require("../middleware/auth");
const { postProject, putProject, putProjectScreenshot, deleteProject, deleteProjectScreenshot } = require("../controllers/projects");

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
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const filePath = `uploads/${req.userId}/projects`;
        fs.readdir(filePath, (err, files) => {
          if (err) {
            fs.mkdir(filePath, { recursive: true }, err => {
              if (err) throw new Error(err);
              cb(null, filePath);
            });
          } else {
            cb(null, filePath);
          }
        });
      },
      filename: (req, file, cb) => {
        cb(null, `${uniqid()}-${file.originalname}`);
      }
    })
  }).single("screenshot"),
  putProjectScreenshot
);
router.delete("/:id", authMiddleware, deleteProject);
router.delete("/:id/screenshot", authMiddleware, deleteProjectScreenshot);

module.exports = router;
