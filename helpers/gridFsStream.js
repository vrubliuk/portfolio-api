const Grid = require("gridfs-stream");
var mongoose = require("mongoose");
Grid.mongo = mongoose.mongo;

let db;
const gfs = () => {
  const gfs = Grid(db);
  gfs.collection("files");
  return gfs;
};
const setGfsStreamDb = value => {
  db = value;
};
const gfsRemoveFile = id => {
  return gfs().remove({ _id: id, root: "files" }, err => {
    if (err) console.log(err);
  });
};

module.exports = {
  gfs,
  setGfsStreamDb,
  gfsRemoveFile
};
