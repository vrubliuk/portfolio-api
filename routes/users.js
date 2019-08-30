const express = require("express");
const router = express.Router();
const fs = require("fs");
const authMiddleware = require("../middleware/auth");
const { body } = require("express-validator/check");
const multer = require("multer");
const { getUser, postUser, putUser } = require("../controllers/users");
const User = require("../models/user");

router.get("/:id", getUser);
router.post(
  "/",
  [
    body("login")
      .trim()
      .custom(async login => {
        const user = await User.findOne({ login });
        if (user) throw new Error("This login is already in use.");
        return true;
      }),
    // .withMessage("This login is already in use.")
    body("password", "The password should be at least 6 characters long.")
      .trim()
      .isLength({ min: 6 })
  ],
  postUser
);
router.put(
  "/:id",
  authMiddleware,
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const filePath = `uploads/${req.params.id}/${file.fieldname}`;
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
        cb(null, file.originalname);
      }
    })
  }).fields([{ name: "avatar", maxCount: 1 }, { name: "resume", maxCount: 1 }]),
  putUser
);

module.exports = router;
