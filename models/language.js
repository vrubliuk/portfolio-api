const {Schema, model} = require("mongoose");
const {ObjectId} = Schema.Types;

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
  userId: {
    type: ObjectId,
    ref: "User"
  }
});

module.exports = model("Language", languageSchema)
