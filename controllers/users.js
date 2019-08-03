const { validationResult } = require("express-validator/check");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Skill = require("../models/skill");
const Experience = require("../models/experience");
const Education = require("../models/education");
const Language = require("../models/language");

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
      avatar: `${process.env.URL}/${data[0]._doc.avatar}`,
      resume: `${process.env.URL}/${data[0]._doc.resume}`,
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
    const avatarFile = avatarFiles[0]
    if (avatarFile.mimetype !== "image/jpeg" && avatarFile.mimetype !== "image/jpg" && avatarFile.mimetype !== "image/png") {
      next(new Error("File type is not correct"));
    }
    avatar = avatarFile.path;  
  } else if (avatar === "") {
    console.log("deletion");
  }

  const resumeFiles = req.files.resume;
  if (resumeFiles) {
    const resumeFile = resumeFiles[0]
    if (resumeFile.mimetype !== "application/pdf") {  
      next(new Error("File type is not correct"));
    } 
    resume = resumeFile.path;
  } else if (resume === "") {
    console.log("deletion");
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        ...(name !== undefined ? { name } : {}),
        ...(surname !== undefined ? { surname } : {}),
        ...(qualification !== undefined ? { qualification } : {}),
        ...(avatar !== undefined ? { avatar } : {}),
        ...(location !== undefined ? { location } : {}),
        ...(phone !== undefined ? { phone } : {}),
        ...(email !== undefined ? { email } : {}),
        ...(github !== undefined ? { github } : {}),
        ...(linkedIn !== undefined ? { linkedIn } : {}),
        ...(resume !== undefined ? { resume } : {})
      },
      {
        new: true,
        useFindAndModify: false
      }
    ).select("-login -password -__v");
    res.json(user);
  } catch (error) {
    next(error);
  }
};
