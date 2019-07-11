const User = require("../models/user");

const userSelection = "-login -password -__v";

exports.getUser = async (req, res, next) => {
  let { id } = req.params;
  try {
    const user = await User.findOne(id === "me" ? { login: "val" } : { _id: id }).select(userSelection);
    res.json(user);
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
        ...(resume ? { resume } : {}),
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
