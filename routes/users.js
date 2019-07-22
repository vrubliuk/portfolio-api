const express = require("express");
const router = express.Router();
const fs = require("fs");
const { body } = require("express-validator/check");
const multer = require("multer");
const { getUser, postUser, putUser } = require("../controllers/users");
const User = require("../models/user");

router.get("/:id", getUser);

router.post(
  "/",
  [
    body("login")
      .custom(async login => {
        const user = await User.findOne({ login });
        if (user) throw new Error("This login is already in use.");
        return true;
      })
      // .withMessage("This login is already in use.")
      .trim(),
    body("password", "The password should be at least 6 characters long.")
      .isLength({ min: 6 })
      .trim()
  ],
  postUser
);

router.put(
  "/:id",
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        fs.readdir("uploads/images", (err, files) => {
          if (err) throw new Error(err);
          if (files.includes(req.params.id)) {
            cb(null, `uploads/images/${req.params.id}/`);
          } else {
            fs.mkdir(`uploads/images/${req.params.id}/`, err => {
              if (err) throw new Error(err);
              cb(null, `uploads/images/${req.params.id}/`);
            });
          }
        });
      },
      filename: (req, file, cb) => {
        cb(null,file.originalname);
      }
      // filename: (req, file, cb) => {
      //   cb(null, `${Date.now()}-${file.originalname}`);
      // }
    })
    // fileFilter: (req, file, cb) => {
    //   // console.log(req);
    //   console.log(req.files);

    //   cb(null, file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png");
    // }
  }).fields([{ name: "avatar", maxCount: 1 }, { name: "resume", maxCount: 1 }]),
  // multer({
  //   storage: multer.diskStorage({
  //     destination: (req, file, cb) => {
  //       cb(null, "uploads");
  //     },
  //     filename: (req, file, cb) => {
  //       cb(null, `${Date.now()}-${file.originalname}`);
  //     }
  //   }),
  //   fileFilter: (req, file, cb) => {
  //     cb(null, file.mimetype === "application/pdf");
  //   }
  // }).single("resume"),
  putUser
);

module.exports = router;
