const express = require("express");
const users = require("./users");
const languages = require("./languages");

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

  app.use("/api/languages", languages);

  app.use((req, res) => {
    res.status(404).send("<h1>Page not found</h1>");
  });

  app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    console.log("111", message);
    res.status(status).json({ message });
  });
};
