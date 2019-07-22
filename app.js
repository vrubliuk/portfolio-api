const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const useRoutes = require("./routes");

const app = express();
app.use("/uploads/images", express.static(path.join(__dirname, "uploads", "images")));
useRoutes(app);

mongoose.set('useCreateIndex', true);
mongoose
  .connect(
    "mongodb+srv://val:lFyywe3NhqVWEYo5@portfolio-jumvs.mongodb.net/portfolio?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(8080);
  })
  .catch(error => {
    console.log(error);
  });
