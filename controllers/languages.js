// const { validationResult } = require("express-validator/check");
const Language = require("../models/language");

exports.postLanguage = async (req, res, next) => {
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
        ...(name !== undefined ? { name } : {}),
        ...(level !== undefined ? { level } : {}),
        ...(priority !== undefined ? { priority } : {})
      },
      {
        new: true,
        useFindAndModify: false
      }
    ).select("-userId -__v");
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
