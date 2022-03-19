function randomString(length) {
  const Character =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randString = "";
  for (let i = 0; i < length; i++) {
    let randNum = Math.floor(Math.random() * Character.length);
    randString += Character[randNum];
  }
  return randString;
}

module.exports = randomString