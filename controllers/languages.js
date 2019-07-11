const { validationResult } = require("express-validator/check");
const Language = require("../models/language");

exports.postLanguage = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    next(error);
  }
  const { name, level, priority } = req.body;
  const language = new Language({
    name,
    level,
    priority,
    userId: "5d27092f6a96d823b45686ab"
  });
  try {
    const newLanguage = await language.save();
    res.status(201).json(newLanguage);
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
