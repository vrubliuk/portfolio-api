const express = require("express");
const personRoutes = require("./routes/person")
const app = express();

app.use(personRoutes)

app.listen(8080);
