require("dotenv").config();
const GridFsStorage = require("multer-gridfs-storage");

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
const setGfsStorageConnection = value => {
  connection = value;
};

module.exports = {
  storage,
  setGfsStorageConnection
};
