const db = require("../../config/mongoose");
const Url = require("../url");

db.once("open", () => {
  console.log("Mongoose connected!");
});
