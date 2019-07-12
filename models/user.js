const { Schema, model } = require("mongoose");
// const {ObjectId} = Schema.Types;

const userSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: ""
  },
  surname: {
    type: String,
    default: ""
  },
  qualification: {
    type: String,
    default: ""
  },
  avatar: {
    type: String,
    default: ""
  },
  location: {
    type: String,
    default: ""
  },
  phone: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: "",
    unique: true,
  },
  github: {
    type: String,
    default: ""
  },
  linkedIn: {
    type: String,
    default: ""
  },
  // skillIds: [ObjectId],
  // experienceIds: [ObjectId],
  // educationIds: [ObjectId],
  // languageIds: [{
  //   type: ObjectId,
  //   ref: "Language"
  // }],
  // projectIds: [ObjectId],
  resume: {
    type: String,
    default: ""
  }
});

module.exports = model("User", userSchema);
