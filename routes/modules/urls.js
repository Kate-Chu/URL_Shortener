const express = require("express");
const router = express.Router();
const Url = require("../../models/url");
const randomString = require("../../string-generator");
const DOMAIN = "https://powerful-taiga-78579.herokuapp.com/";

router.get("/result", (req, res) => {
  const suburl = req.query.suburl;
  const newUrl = DOMAIN + randomString(5);

  Url.find()
    .lean()
    .then((urls) => {
      const existedUrl = urls.filter((url) => {
        return url.originalUrl.toLowerCase() === suburl.toLowerCase();
      });

      if (existedUrl.length) {
        const shortURL = existedUrl[0].shortURL;
        res.render("result", { suburl, newUrl: shortURL });
      } else {
        const url = new Url({ originalUrl: suburl, shortURL: newUrl });
        return url
          .save()
          .then(() => {
            res.render("result", { suburl, newUrl });
          })
          .catch((error) => {
            console.log(error);
            res.render("error");
          });
      }
    })
    .catch((error) => {
      console.log(error);
      res.render("error");
    });
});

router.get("/:id", (req, res) => {})

module.exports = router;
