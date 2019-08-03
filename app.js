const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const useRoutes = require("./routes");

const app = express();
app.use("/uploads/images", express.static(path.join(__dirname, "uploads", "images")));
useRoutes(app);

mongoose.set("useCreateIndex", true);
mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@portfolio-jumvs.mongodb.net/portfolio?retryWrites=true`, { useNewUrlParser: true })
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch(error => {
    console.log(error);
  });
