const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const personRoutes = require("./routes/person");
const languageRoutes = require("./routes/language");

const app = express();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(personRoutes);
app.use(languageRoutes);

app.use((error, req, res, next) => {  
  const status = error.statusCode || 500;
  const message = error.message;
  console.log("111", message);
  
  res.status(status).json({ message });
});

(async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://val:lFyywe3NhqVWEYo5@portfolio-jumvs.mongodb.net/portfolio?retryWrites=true",
      { useNewUrlParser: true }
    );
    app.listen(8080);
  } catch (error) {
    console.log(error);
  }
})();
