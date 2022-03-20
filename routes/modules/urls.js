const express = require("express");
const router = express.Router();
const Url = require("../../models/url");
const randomString = require("../../string-generator");

router.get("/result", (req, res) => {
  const suburl = req.query.suburl;
  Url.find()
    .lean()
    .then((urls) => {
      const existUrl = urls.filter(
        (url) => url.originalUrl.toLowerCase() === suburl.toLowerCase()
      );

      if (existUrl.length) {
        const shortUrl = existUrl[0].shortUrl;
        const originalUrl = existUrl[0].originalUrl;
        res.render("result", { suburl, newUrl: shortUrl, originalUrl });
      } else {
        let newUrl = req.headers.host + "/" + randomString(5);
        const url = new Url({ originalUrl: suburl, shortUrl: newUrl });
        return url
          .save()
          .then(() => {
            res.render("result", { suburl, newUrl, originalUrl: suburl });
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

router.get("/app/:shortUrl", (req, res) => {
  // const Url = require("./models/url");
  const shortUrl = req.params;
  return Url.findOne({ shortUrl })
    .lean()
    .then((item) => {
      console.log(item);
      res.redirect(item.originalUrl);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
