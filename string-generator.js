const Url = require("./models/url");

function randomString(length) {
  const Character =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randString = "";
  for (let i = 0; i < length; i++) {
    let randNum = Math.floor(Math.random() * Character.length);
    randString += Character[randNum];
  }

  const existStr = Url.find()
    .lean()
    .then((urls) => urls.filter(url.randStr === randString));

  if (existStr) return randomString(length);

  return randString;
}

module.exports = randomString;
