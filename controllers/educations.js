const Education = require("../models/education");
const unselect = require("../helpers/unselect");

exports.postEducation = async (req, res, next) => {
  const { userId } = req;
  const { speciality, institution, startDate, endDate, priority } = req.body;
  const education = new Education({
    speciality,
    institution,
    startDate,
    endDate,
    priority,
    userId
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
  const { userId } = req;
  const { id } = req.params;
  const { speciality, institution, startDate, endDate, priority } = req.body;
  try {
    const education = await Education.findById(id);
    if (education.userId.toString() !== userId) return res.status(403).json({ message: "Not authorized!" });
    if (speciality !== undefined) education.speciality = speciality;
    if (institution !== undefined) education.institution = institution;
    if (startDate !== undefined) education.startDate = startDate;
    if (endDate !== undefined) education.endDate = endDate;
    if (priority !== undefined) education.priority = priority;
    const updatedEducation = await education.save();
    res.json(unselect(updatedEducation._doc, "userId", "__v"));
  } catch (error) {
    next(error);
  }
};

exports.deleteEducation = async (req, res, next) => {
  const { userId } = req;
  const { id } = req.params;
  try {
    const education = await Education.findById(id);
    if (education.userId.toString() !== userId) return res.status(403).json({ message: "Not authorized!" });
    await Education.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
