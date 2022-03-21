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
        res.render("result", { suburl, originalUrl, shortUrl });
      } else {
        let urlRandStr = randomString(5);
        let shortUrl = req.headers.host + "/" + urlRandStr;
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
    })
    .catch((error) => {
      console.log(error);
      res.render("error", { error });
    });
});

// 無法正確取得頁面
// router.get("/:urlRandStr", (req, res) => {
//   const { urlRandStr } = req.params;
//   return Url.findOne({ urlRandStr })
//     .lean()
//     .then((item) => {
//       res.redirect(item.originalUrl);
//     })
//     .catch((error) => console.error(error));
// });

module.exports = router;
