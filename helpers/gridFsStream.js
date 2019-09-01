const Grid = require("gridfs-stream");
var mongoose = require("mongoose");
Grid.mongo = mongoose.mongo;

let db;
const gfs = () => {
  const gfs = Grid(db);
  gfs.collection("files");
  return gfs;
};

const setGridFsStreamDb = value => {
  db = value;
};

module.exports = {
  gfs,
  setGridFsStreamDb
};
