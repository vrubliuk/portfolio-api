const { validationResult } = require("express-validator/check");
const Language = require("../models/language");

exports.postLanguage = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed")
    error.statusCode = 422;
    throw error;
  }

  const { name, level, priority } = req.body;

  const language = new Language({
    name,
    level,
    priority
  });
  // language.save().then(result => {
  //   res.status(201).json({
  //     result
  //   });
  // }).catch(error => {
  //   next(error)
  // })
  
  try {
    const result = await language.save()
    res.status(201).json({
      result
    });
 
  } catch (err) {
    next(err)
  }

  // try {
  //   const result = await language.save();
  //   res.status(201).json({
  //     result
  //   });
  // } catch (error) {
  //   next(error)
    
  // }

};
