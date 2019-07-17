const Experience = require("../models/experience");

exports.postExperience = async (req, res, next) => {
  const { position, company, city, startDate, endDate, priority } = req.body;
  const experience = new Experience({
    position,
    company,
    city,
    startDate,
    endDate,
    priority,
    userId: "5d27092f6a96d823b45686ab"
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
  const { id } = req.params;
  const { position, company, city, startDate, endDate, priority } = req.body;
  try {
    const experience = await Experience.findByIdAndUpdate(
      id,
      {
        ...(position ? { position } : {}),
        ...(company ? { company } : {}),
        ...(city ? { city } : {}),
        ...(startDate ? { startDate } : {}),
        ...(endDate ? { endDate } : {}),
        ...(priority ? { priority } : {})
      },
      {
        new: true,
        useFindAndModify: false
      }
    ).select("-userId -__v");
    res.json(experience);
  } catch (error) {
    next(error);
  }
};

exports.deleteExperience = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Experience.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
