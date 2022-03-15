const mongoose = require("mongoose");
const Url = require("../url");

mongoose.connect("mongodb://localhost/URL_Shortener");

const db = mongoose.connection;
db.on("error", () => {
  console.log("Mongoose error!");
});
db.once("open", () => {
  console.log("Mongoose connected!");

  for (let i = 0; i < 10; i++) {
    Url.create({
      id: i,
      originalUrl: "http://localhost:3000/",
      shortURL: "http://localhost:3000/",
    });
  }
  console.log("done");
});
