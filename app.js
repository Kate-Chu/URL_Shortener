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

app.get("/", (req, res) => {
  res.send("This is my first Express Web App.");
});

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
