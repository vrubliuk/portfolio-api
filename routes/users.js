const express = require("express");
const router = express.Router();
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
        cb(null, "uploads");
      },
      filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
      }
    }),
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
