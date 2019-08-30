const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const educationSchema = new Schema({
  speciality: String,
  institution: String,
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

module.exports = model("Education", educationSchema);
