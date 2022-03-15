const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
  shortURL: {
    type: String,
    requires: true,
  },
});

module.exports = mongoose.model("Url", urlSchema);
