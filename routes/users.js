const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { body } = require("express-validator/check");
const multer = require("multer");
const { getUser, postUser, putUser } = require("../controllers/users");
const User = require("../models/user");
const { storage } = require("../helpers/gridFsStorage");

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
    storage: storage()
  }).fields([{ name: "avatar", maxCount: 1 }, { name: "resume", maxCount: 1 }]),
  putUser
);

module.exports = router;
