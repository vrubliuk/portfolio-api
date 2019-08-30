const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const projectSchema = new Schema({
  name: String,
  screenshot: String,
  websiteUrl: String,
  repositoryUrl: String,
  summary: String,
  tags: [String],
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

module.exports = model("Project", projectSchema);
