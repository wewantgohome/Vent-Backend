const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET_KEY;

const generateAccessToken = (id) => {
  const accessToken = jwt.sign(
    {
      id,
    },
    secret,
    {
      expiresIn: process.env.ACCESS_EXPIRED,
    }
  );

  return accessToken;
};

const generateRefreshToken = (id) => {
  const refreshToken = jwt.sign(
    {
      id,
    },
    secret,
    {
      expiresIn: process.env.REFRESH_EXPIRED,
    }
  );
  return refreshToken;
};

module.exports = { generateAccessToken, generateRefreshToken };
