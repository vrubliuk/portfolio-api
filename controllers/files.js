const { gfs } = require("../helpers/gridFsStream");
const mongoose = require("mongoose");

exports.getFile = async (req, res, next) => {
  try {
    gfs().files.findOne({ _id: mongoose.Types.ObjectId(req.params.id) }, (err, file) => {
      if (!file) {
        return res.sendStatus(404);
      }
      const readstream = gfs().createReadStream({
        _id: req.params.id
      });
      readstream.pipe(res);
    });
  } catch (err) {
    next(err);
  }
};
