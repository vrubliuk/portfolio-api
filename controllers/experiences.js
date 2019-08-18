const Experience = require("../models/experience");
const unselect = require("../helpers/unselect");

exports.postExperience = async (req, res, next) => {
  const {userId} = req;
  const { position, company, city, startDate, endDate, priority } = req.body;
  const experience = new Experience({
    position,
    company,
    city,
    startDate,
    endDate,
    priority,
    userId
  });
  try {
    const { _id, position, company, city, startDate, endDate, priority } = await experience.save();
    res.status(201).json({
      _id,
      position,
      company,
      city,
      startDate,
      endDate,
      priority
    });
  } catch (error) {
    next(error);
  }
};

exports.putExperience = async (req, res, next) => {
  const {userId} = req;
  const { id } = req.params;
  const { position, company, city, startDate, endDate, priority } = req.body;
  try {
    const experience = await Experience.findById(id)
    if (experience.userId.toString() !== userId) return res.status(403).json({ message: "Not authorized!" });
    if (position !== undefined) experience.position = position;
    if (company !== undefined) experience.company = company;
    if (city !== undefined) experience.city = city;
    if (startDate !== undefined) experience.startDate = startDate;
    if (endDate !== undefined) experience.endDate = endDate;
    if (priority !== undefined) experience.priority = priority;
    const updatedExperience = await experience.save();
    res.json(unselect(updatedExperience._doc, "userId", "__v"));
  } catch (error) {
    next(error);
  }
};

exports.deleteExperience = async (req, res, next) => {
  const { userId } = req;
  const { id } = req.params;
  try {
    const experience = await Experience.findById(id);
    if (experience.userId.toString() !== userId) return res.status(403).json({ message: "Not authorized!" });
    await Experience.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
