const express = require("express");
const router = express.Router();
const Url = require("../../models/url");
const randomString = require("../../string-generator");
// const DOMAIN = "https://powerful-taiga-78579.herokuapp.com/";

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
        let newUrl = randomString(5);
        // let newUrl = DOMAIN + randStr;
        const url = new Url({ originalUrl: suburl, shortURL: newUrl });
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

router.get("/siJ9C", async (req, res) => {

  const shortUrl = await Url.findOne({ shortURL: req.params.shortUrl });
  if (!shortUrl) return res.sendStatus(404);
  res.redirect(shortUrl.originalUrl);

  // const string = req.params.string;
  // return Url.find({ randStr: string })
  //   .lean()
  //   .then((url) =>
  //     res.render("result", { suburl: url.originalUrl, newUrl: url.shortURL })
  //   )
  //   .catch((error) => console.error(error));
});

module.exports = router;
