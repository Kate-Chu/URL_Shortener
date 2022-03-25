const express = require("express");
const router = express.Router();
const Url = require("../../models/url");
const randomString = require("../../string-generator");

router.get("/result", (req, res) => {
  const suburl = req.query.suburl;

  Url.findOne({ originalUrl: suburl }).then((existUrl) => {
    if (existUrl) {
      const shortUrl = existUrl.shortUrl;
      const originalUrl = existUrl.originalUrl;
      res.render("result", { suburl, originalUrl, shortUrl });
    } else {
      let urlRandStr = randomString(5);
      let shortUrl = req.headers.host + "/urls/" + urlRandStr;
      const url = new Url({
        originalUrl: suburl,
        shortUrl,
        urlRandStr,
      });
      return url
        .save()
        .then(() => {
          res.render("result", {
            suburl,
            shortUrl,
            originalUrl: suburl,
          });
        })
        .catch((error) => {
          console.log(error);
          res.render("error", { error });
        });
    }
  });
});

router.get("/:urlRandStr", (req, res) => {
  const { urlRandStr } = req.params;

  return Url.findOne({ urlRandStr }) //
    .lean()
    .then((item) => {
      res.redirect(item.originalUrl);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
