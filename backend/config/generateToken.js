const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
