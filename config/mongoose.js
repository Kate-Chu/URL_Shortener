const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/URL_Shortener");

const db = mongoose.connection;

db.on("error", () => {
  console.log("Mongoose error!");
});

db.once("open", () => {
  console.log("Mongoose connected!");
});

module.exports = db;
