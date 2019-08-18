const Skill = require("../models/skill");
const unselect = require("../helpers/unselect");

exports.postSkill = async (req, res, next) => {
  const {userId} = req;
  const { title, technologies, priority } = req.body;
  const skill = new Skill({
    title,
    technologies,
    priority,
    userId
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
  const {userId} = req;
  const { id } = req.params;
  const { title, technologies, priority } = req.body;
  try {
    const skill = await Skill.findById(id);
    if(skill.userId.toString() !== userId) return res.status(403).json({message: "Not authorized!"})
    if (title !== undefined) skill.title = title;
    if (technologies !== undefined) skill.technologies = technologies;
    if (priority !== undefined) skill.priority = priority;
    const updatedSkill = await skill.save();
    res.json(
      unselect(updatedSkill._doc, "userId", "__v"),
    );  
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
