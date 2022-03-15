const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/URL_Shortener");

const db = mongoose.connection;
db.on("error", () => {
  console.log("Mongoose error!");
});
db.once("open", () => {
  console.log("Mongoose connected!");
});

const expHbs = require("express-handlebars");
app.engine("hbs", expHbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
