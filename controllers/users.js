const User = require("../models/user");
const Skill = require("../models/skill");
const Experience = require("../models/experience");
const Education = require("../models/education");
const Language = require("../models/language");

const userSelection = "-login -password -__v";

exports.getUser = async (req, res, next) => {
  let { id } = req.params;
  try {
    const data = await Promise.all([
      User.findById(id).select(userSelection), 
      Skill.find({ userId: id }).select("-userId -__v"),
      Experience.find({ userId: id }).select("-userId -__v"),
      Education.find({ userId: id }).select("-userId -__v"),
      Language.find({ userId: id }).select("-userId -__v"),
    ]);
    res.json({
      user: data[0],
      skills: data[1],
      experiences: data[2],
      educations: data[3],
      languages: data[4],
    });
  } catch (error) {
    next(error);
  }
};

exports.postUser = async (req, res, next) => {
  const { login, password } = req.body;
  const user = new User({
    login,
    password
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

  const { name, surname, qualification, avatar, location, phone, email, github, linkedIn, resume } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        ...(name ? { name } : {}),
        ...(surname ? { surname } : {}),
        ...(qualification ? { qualification } : {}),
        ...(avatar ? { avatar } : {}),
        ...(location ? { location } : {}),
        ...(phone ? { phone } : {}),
        ...(email ? { email } : {}),
        ...(github ? { github } : {}),
        ...(linkedIn ? { linkedIn } : {}),
        ...(resume ? { resume } : {})
      },
      {
        new: true,
        useFindAndModify: false
      }
    ).select(userSelection);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
