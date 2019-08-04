const fs = require("fs");
const { validationResult } = require("express-validator/check");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Skill = require("../models/skill");
const Experience = require("../models/experience");
const Education = require("../models/education");
const Language = require("../models/language");
const unselect = require("../helpers/unselect");

exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await Promise.all([
      User.findById(id).select("-login -password -__v"),
      Skill.find({ userId: id }).select("-userId -__v"),
      Experience.find({ userId: id }).select("-userId -__v"),
      Education.find({ userId: id }).select("-userId -__v"),
      Language.find({ userId: id }).select("-userId -__v")
    ]);
    res.json({
      ...data[0]._doc,
      avatar: data[0]._doc.avatar ? `${process.env.URL}/${data[0]._doc.avatar}` : "",
      resume: data[0]._doc.resume ? `${process.env.URL}/${data[0]._doc.resume}` : "",
      skills: data[1],
      experiences: data[2],
      educations: data[3],
      languages: data[4]
    });
  } catch (error) {
    next(error);
  }
};

exports.postUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.statusCode = 422;
    next(error);
  }
  const { login, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({
    login,
    password: hashedPassword
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

exports.putUser = async (req, res, next) => {
  const { id } = req.params;
  let { name, surname, qualification, avatar, location, phone, email, github, linkedIn, resume } = req.body;

  const avatarFiles = req.files.avatar;
  if (avatarFiles) {
    const avatarFile = avatarFiles[0];
    if (avatarFile.mimetype !== "image/jpeg" && avatarFile.mimetype !== "image/jpg" && avatarFile.mimetype !== "image/png") {
      fs.unlink(avatarFile.path, err => {
        if (err) return next(err);
      });
      return next(new Error("File type is not correct"));
    }
    avatar = avatarFile.path;
  }

  const resumeFiles = req.files.resume;
  if (resumeFiles) {
    const resumeFile = resumeFiles[0];
    if (resumeFile.mimetype !== "application/pdf") {
      fs.unlink(resumeFile.path, err => {
        if (err) return next(err);
      });
      return next(new Error("File type is not correct"));
    }
    resume = resumeFile.path;
  }

  try {
    const user = await User.findById(id);
    if (name !== undefined) user.name = name;
    if (surname !== undefined) user.surname = surname;
    if (qualification !== undefined) user.qualification = qualification;
    if (avatar !== undefined) {
      if ((avatar !== user.avatar && user.avatar !== "") || (avatar === "" && user.avatar !== "")) {
        fs.unlink(user.avatar, err => {
          if (err) throw err;
        });
      }
      user.avatar = avatar;
    }
    if (location !== undefined) user.location = location;
    if (phone !== undefined) user.phone = phone;
    if (email !== undefined) user.email = email;
    if (github !== undefined) user.github = github;
    if (linkedIn !== undefined) user.linkedIn = linkedIn;
    if (resume !== undefined) {
      if ((resume !== user.resume && user.resume !== "") || (resume === "" && user.resume !== "")) {
        fs.unlink(user.resume, err => {
          if (err) throw err;
        });
      }
      user.resume = resume;
    }
    const updatedUser = await user.save();
    res.json({
      ...unselect(updatedUser._doc, "login", "password", "__v"),
      avatar: user.avatar ? `${process.env.URL}/${user.avatar}` : "",
      resume: user.resume ? `${process.env.URL}/${user.resume}` : ""
    });
  } catch (error) {
    next(error);
  }
};
