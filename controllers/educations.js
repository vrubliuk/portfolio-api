const Education = require("../models/education");

exports.postEducation = async (req, res, next) => {
  const { speciality, institution, startDate, endDate, priority } = req.body;
  const education = new Education({
    speciality,
    institution,
    startDate,
    endDate,
    priority,
    userId: "5d27092f6a96d823b45686ab"
  });
  try {
    const { _id, speciality, institution, startDate, endDate, priority } = await education.save();
    res.status(201).json({
      _id,
      speciality,
      institution,
      startDate,
      endDate,
      priority
    });
  } catch (error) {
    next(error);
  }
};

exports.putEducation = async (req, res, next) => {
  const { id } = req.params;
  const { speciality, institution, startDate, endDate, priority } = req.body;
  try {
    const education = await Education.findByIdAndUpdate(
      id,
      {
        ...(speciality !== undefined ? { speciality } : {}),
        ...(institution !== undefined ? { institution } : {}),
        ...(startDate !== undefined ? { startDate } : {}),
        ...(endDate !== undefined ? { endDate } : {}),
        ...(priority !== undefined ? { priority } : {})
      },
      {
        new: true,
        useFindAndModify: false
      }
    ).select("-userId -__v");
    res.json(education);
  } catch (error) {
    next(error);
  }
};

exports.deleteEducation = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Education.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
