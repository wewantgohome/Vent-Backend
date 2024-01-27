const jwt = require("jsonwebtoken");
const { User } = require("../models");
const authUtil = require("../response/authUtil");

require("dotenv").config();
const secret = process.env.SECRET_KEY;
exports.authenticateUser = async (req, res, next) => {
  const accessToken = req.headers.accesstoken;
  if (!accessToken) {
    return res
      .status(400)
      .send(authUtil.successTrue(400, "엑세스 토큰이 존재하지 않습니다."));
  }

  try {
    const decoded = jwt.verify(accessToken, secret);

    const userId = decoded.id;
    const user = await User.findOne({
      where: {
        userId,
      },
    });

    if (!user) {
      return res
        .status(401)
        .send(authUtil.successTrue(401, "존재하지 않는 유저입니다."));
    }

    req.user = user;

    next();
  } catch (err) {
    if ((err.name = "TokenExpiredError")) {
      return res
        .status(401)
        .json(authUtil.successTrue(403, "토큰이 만료되었습니다."));
    }

    return res
      .status(401)
      .json(authUtil.successTrue(403, "유효하지 않은 토큰입니다."));
  }
};
