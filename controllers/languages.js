const Language = require("../models/language");
const unselect = require("../helpers/unselect");

exports.postLanguage = async (req, res, next) => {
  const { userId } = req;
  const { name, level, priority } = req.body;
  const language = new Language({
    name,
    level,
    priority,
    userId
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
  const { userId } = req;
  const { id } = req.params;
  const { name, level, priority } = req.body;
  try {
    const language = await Language.findById(id);
    if (language.userId.toString() !== userId) return res.status(403).json({ message: "Not authorized!" });
    if (name !== undefined) language.name = name;
    if (level !== undefined) language.level = level;
    if (priority !== undefined) language.priority = priority;
    const updatedLanguage = await language.save();
    res.json(unselect(updatedLanguage._doc, "userId", "__v"));
  } catch (error) {
    next(error);
  }
};

exports.deleteLanguage = async (req, res, next) => {
  const { userId } = req;
  const { id } = req.params;
  try {
    const language = await Language.findById(id);
    if (language.userId.toString() !== userId) return res.status(403).json({ message: "Not authorized!" });
    await Language.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
