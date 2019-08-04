const path = require("path");

module.exports = (...args) => {
  return path.join(path.dirname(process.mainModule.filename), ...args);
};
