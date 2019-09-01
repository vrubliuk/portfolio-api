const GridFsStorage = require("multer-gridfs-storage");
require("dotenv").config();
let connection;
const storage = () => {
  return new GridFsStorage({
    db: connection,
    file: (req, file) => {
      return {
        filename: file.originalname,
        bucketName: "files"
      };
    }
  });
};

const setGridFsStorageConnection = value => {
  connection = value;
};

module.exports = {
  storage,
  setGridFsStorageConnection
};
