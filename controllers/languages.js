// const { validationResult } = require("express-validator/check");
const Language = require("../models/language");
const languageSelection = "-userId -__v";

exports.postLanguage = async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   const error = new Error("Validation failed");
  //   error.statusCode = 422;
  //   next(error);
  // }
  const { name, level, priority } = req.body;
  const language = new Language({
    name,
    level,
    priority,
    userId: "5d27092f6a96d823b45686ab"
  });
  try {
    const { _id, name, level, priority } = await language.save();
    res.status(201).json({
      _id,
      name,
      level,
      priority
    });
  } catch (error) {
    next(error);
  }
};

exports.putLanguage = async (req, res, next) => {
  const { id } = req.params;
  const { name, level, priority } = req.body;
  try {
    const language = await Language.findByIdAndUpdate(
      id,
      {
        ...(name ? { name } : {}),
        ...(level ? { level } : {}),
        ...(priority ? { priority } : {})
      },
      {
        new: true,
        useFindAndModify: false
      }
    ).select(languageSelection);
    res.json(language);
  } catch (error) {
    next(error);
  }
};

exports.deleteLanguage = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Language.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
