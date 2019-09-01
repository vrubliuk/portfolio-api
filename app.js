require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const compression = require("compression");
const { setGridFsStorageConnection } = require("./helpers/gridFsStorage");
const { setGridFsStreamDb } = require("./helpers/gridFsStream");

const app = express();
mongoose.set("useCreateIndex", true);
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@portfolio-jumvs.mongodb.net/${process.env.DB_NAME}?retryWrites=true`, {
  useNewUrlParser: true
});
const connection = mongoose.connection;
setGridFsStorageConnection(connection); 
connection.once("open", () => {
  setGridFsStreamDb(connection.db)
});


app.use(helmet());
app.use(compression());
require("./middleware/log")(app)
require("./routes")(app);

app.listen(process.env.PORT || 8080);
