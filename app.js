const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const expHbs = require("express-handlebars");

app.use(express.static(path.join(__dirname, "public")));
app.engine("handlebars", expHbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));

require("./config/mongoose");

const routes = require("./routes");
const { env } = require("process");
app.use(routes);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).render("error", { error });
});

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
