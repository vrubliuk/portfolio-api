const express = require("express");
const multer = require("multer");
const auth = require("./auth");
const users = require("./users");
const skills = require("./skills");
const experiences = require("./experiences");
const educations = require("./educations");
const languages = require("./languages");
const { getNotFound } = require("../controllers/errors");

module.exports = app => {
  app.use(express.json());

  app.use(
    multer({
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "uploads");
        },
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        }
      }),
      fileFilter: (req, file, cb) => {
        cb(null, file.mimetype === 'application/pdf')
      }
    }).single("resume")
  );

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

  app.use("/api/auth", auth);

  app.use("/api/users", users);

  app.use("/api/skills", skills);

  app.use("/api/experiences", experiences);

  app.use("/api/educations", educations);

  app.use("/api/languages", languages);

  app.use(getNotFound);

  app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message });
  });
};
