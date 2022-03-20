const express = require("express");
const router = express.Router();
const Url = require("../../models/url");
const randomString = require("../../string-generator");
const DOMAIN = "https://powerful-taiga-78579.herokuapp.com/";

router.get("/result", (req, res) => {
  const suburl = req.query.suburl;

  Url.find()
    .lean()
    .then((urls) => {
      const existUrl = urls.filter(
        (url) => url.originalUrl.toLowerCase() === suburl.toLowerCase()
      );

      if (existUrl.length) {
        const shortURL = existUrl[0].shortURL;
        res.render("result", { suburl, newUrl: shortURL });
      } else {
        let id = randomString(5);
        let newUrl = DOMAIN + id;
        const url = new Url({ originalUrl: suburl, shortURL: newUrl, id });
        return url
          .save()
          .then(() => {
            res.render("result", { suburl, newUrl });
          })
          .catch((error) => {
            console.log(error);
            res.render("error", { error });
          });
      }
    })
    .catch((error) => {
      console.log(error);
      res.render("error", { error });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.send(`${id}`);
});

module.exports = router;
