const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const experienceSchema = new Schema({
  position: String,
  company: String,
  city: String,
  startDate: String,
  endDate: String,
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

module.exports = model("Experience", experienceSchema);
