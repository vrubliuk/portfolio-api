const {Schema, model} = require("mongoose");

const languageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  priority: {
    type: Number,
    required: true
  },

});

module.exports = model("Language", languageSchema)
