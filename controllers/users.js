exports.getUser = (req, res, next) => {
  
  
  res.status(200).json({
    data: req.params
  })
}