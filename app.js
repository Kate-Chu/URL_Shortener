const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const expHbs = require("express-handlebars");
const bodyParser = require("body-parser");
const routes = require("./routes");

app.engine("handlebars", expHbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));
app.use(bodyParser.urlencoded({ extended: true }));

require("./config/mongoose");

app.use(routes);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).render("error", { err });
});

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
