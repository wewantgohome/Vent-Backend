const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET_KEY;

const generateAccessToken = (userId) => {
  const accessToken = jwt.sign(
    {
      id: userId,
    },
    secret,
    {
      expiresIn: process.env.ACCESS_EXPIRED,
    }
  );

  return accessToken;
};

const generateRefreshToken = (userId) => {
  const refreshToken = jwt.sign(
    {
      id: userId,
    },
    secret,
    {
      expiresIn: process.env.REFRESH_EXPIRED,
    }
  );
  return refreshToken;
};

module.exports = { generateAccessToken, generateRefreshToken };
