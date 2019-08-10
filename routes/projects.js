const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const uniqid = require('uniqid');
const { postProject, putProject, putProjectScreenshot, deleteProject, deleteProjectScreenshot } = require("../controllers/projects");

router.post("/", postProject);
router.put("/:id", putProject);
router.put(
  "/:id/screenshot",
  multer({
    fileFilter: (req, file, cb) => {
      const typeIsCorrect = file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png";
      cb(null, typeIsCorrect);
    },
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const filePath = `uploads/5d27092f6a96d823b45686ab/projects`;
        fs.readdir(filePath, (err, files) => {
          if (err) {
            fs.mkdir(filePath, { recursive: true }, err => {
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
router.delete("/:id", deleteProject);
router.delete("/:id/screenshot", deleteProjectScreenshot);

module.exports = router;
