const mongoose = require("mongoose");
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/URL_Shortener";

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

db.on("error", () => {
  console.log("Mongoose error!");
});

db.once("open", () => {
  console.log("Mongoose connected!");
});

module.exports = db;
