const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const languageSchema = new Schema({
  name: String,
  level: String,
  priority: {
    type: Number,
    required: true
  },
  userId: {
    type: ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = model("Language", languageSchema);
