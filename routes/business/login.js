const { User } = require("../../models");
const authUtil = require("../../response/authUtil");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../tokens/jwt");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { businessId, pwd } = req.body;

  try {
    const business = await User.findOne({
      where: {
        userId : businessId,
      },
    });
    if (!business) {
      return res
        .status(200)
        .send(authUtil.successTrue(400, "존재하지 않는 아이디입니다."));
    }
    const checkPassword = await bcrypt.compare(pwd, business.password);
    if (!checkPassword) {
      return res
        .status(200)
        .send(authUtil.successTrue(400, "비밀번호가 맞지 않습니다."));
    }
    const accessToken = generateAccessToken(businessId);
    const refreshToken = generateRefreshToken(businessId);

    return res
      .status(200)
      .send(
        authUtil.jwtSent(200, "비지니스 로그인 성공", accessToken, refreshToken)
      );
  } catch (err) {
    console.error(err);
    return res.status(500).send(authUtil.successFalse(500, "로그인 실패"));
  }
};

module.exports = login;
