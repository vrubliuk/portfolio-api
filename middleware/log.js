const fs = require("fs");
const morgan = require("morgan");
const path = require("../helpers/path");

module.exports = app => {
  const accessLogStream = fs.createWriteStream(path("access.log"), { flags: "a" });
  app.use(morgan("combined", { stream: accessLogStream }));
};
