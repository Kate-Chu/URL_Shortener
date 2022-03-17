const express = require("express");
const router = express.Router();
const Url = require("../../models/url");

router.get("/result", (req, res) => {
  const suburl = req.query.suburl;

  if ("test") {
    res.render("result", { suburl });
  } else {
    res.render("error", { suburl });
  }
});

module.exports = router;
