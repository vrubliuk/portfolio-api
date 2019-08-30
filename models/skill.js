const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const skillSchema = new Schema({
  title: String,
  technologies: [String],
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

module.exports = model("Skill", skillSchema);
