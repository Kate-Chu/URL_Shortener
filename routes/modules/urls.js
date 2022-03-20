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
        let randStr = randomString(5);
        let newUrl = DOMAIN + randStr;
        const url = new Url({ originalUrl: suburl, shortURL: newUrl, randStr });
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

router.get("/:shortURL", (req, res) => {
  const { shortURL } = req.params;

  URL.findOne({ shortURL })
    .then((data) => {
      if (!data) {
        return res.render("error", {
          errorMsg: "Can't found the URL",
          errorURL: req.headers.host + "/" + shortURL,
        });
      }

      res.redirect(data.originalURL);
    })
    .catch((error) => console.error(error));

  // const string = req.params.string;
  // return Url.find({ randStr: string })
  //   .lean()
  //   .then((url) =>
  //     res.render("result", { suburl: url.originalUrl, newUrl: url.shortURL })
  //   )
  //   .catch((error) => console.error(error));
});

module.exports = router;
