const express = require("express");
const path = require("../helpers/path");
const cors = require("cors")
const auth = require("./auth");
const users = require("./users");
const skills = require("./skills");
const experiences = require("./experiences");
const educations = require("./educations");
const languages = require("./languages");
const projects = require("./projects");
const { getNotFound } = require("../controllers/errors");

module.exports = app => {
  app.use("/uploads", express.static(path("uploads")));
  app.use(express.json());
  app.use(cors());
  app.use("/api/auth", auth);
  app.use("/api/users", users);
  app.use("/api/skills", skills);
  app.use("/api/experiences", experiences);
  app.use("/api/educations", educations);
  app.use("/api/languages", languages);
  app.use("/api/projects", projects);
  app.use(getNotFound);
  app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message });
  });
};
