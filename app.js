const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const compression = require("compression");
require("dotenv").config();
const useLog = require("./middleware/log")
const useRoutes = require("./routes");


const app = express();
app.use(helmet());
app.use(compression());
useLog(app);
useRoutes(app);

mongoose.set("useCreateIndex", true);
mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@portfolio-jumvs.mongodb.net/${process.env.DB_NAME}?retryWrites=true`, {
    useNewUrlParser: true
  })
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch(error => {
    console.log(error);
  });
