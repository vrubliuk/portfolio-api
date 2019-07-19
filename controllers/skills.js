const Skill = require("../models/skill");

exports.postSkill = async (req, res, next) => {
  const { title, technologies, priority } = req.body;
  const skill = new Skill({
    title,
    technologies,
    priority,
    userId: "5d27092f6a96d823b45686ab"
  });
  try {
    const { _id, title, technologies, priority } = await skill.save();
    res.status(201).json({
      _id,
      title,
      technologies,
      priority
    });
  } catch (error) {
    next(error);
  }
};

exports.putSkill = async (req, res, next) => {
  const { id } = req.params;
  const { title, technologies, priority } = req.body;
  try {
    const skill = await Skill.findByIdAndUpdate(
      id,
      {
        ...(title !== undefined ? { title } : {}),
        ...(technologies !== undefined ? { technologies } : {}),
        ...(priority !== undefined ? { priority } : {})
      },
      {
        new: true,
        useFindAndModify: false
      }
    ).select("-userId -__v");
    res.json(skill);
  } catch (error) {
    next(error);
  }
};

exports.deleteSkill = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Skill.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
