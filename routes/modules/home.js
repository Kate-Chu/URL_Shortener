const express = require("express");
const router = express.Router();

const Url = require("../../models/url");

router.get("/", (req, res) => {
  res.render("index", req);
});

module.exports = router;
