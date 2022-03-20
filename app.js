const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const expHbs = require("express-handlebars");
const bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, "public")));
app.engine("handlebars", expHbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));
app.use(bodyParser.urlencoded({ extended: true }));

require("./config/mongoose");

const routes = require("./routes");

app.use(routes);

app.get("/:shortUrl", async (req, res) => {
  const Url = require("./models/url");
  const shortUrl = req.params.shortUrl;
  return Url.findOne({ shortUrl: shortUrl })
    .lean()
    .then((url) => res.redirect(url.originalUrl))
    .catch((error) => console.error(error));
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).render("error", { error });
});

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
