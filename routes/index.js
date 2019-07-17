const express = require("express");
const users = require("./users");
const skills = require("./skills");
const experiences = require("./experiences");
const educations = require("./educations");
const languages = require("./languages");
const { getNotFound } = require("../controllers/errors");

module.exports = app => {
  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    next();
  });

  app.use("/api/users", users);

  app.use("/api/skills", skills);
  
  app.use("/api/experiences", experiences);
  
  app.use("/api/educations", educations);
  
  app.use("/api/languages", languages);

  app.use(getNotFound);

  app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    console.log("111", message);
    res.status(status).json({ message });
  });
};
