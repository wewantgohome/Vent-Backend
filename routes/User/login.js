const { User } = require("../../models");
const authUtil = require("../../response/authUtil");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../tokens/jwt");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { userId, pwd } = req.body;

  try {
    const user = await User.findOne({
      where: {
        userId,
      },
    });
    if(!user){
        return res.status(200).send(authUtil.successTrue(400, "존재하지 않는 아이디입니다."))
    }
    const checkPassword = await bcrypt.compare(pwd, user.password);
    if (!checkPassword) {
      return res
        .status(200)
        .send(authUtil.successFalse(400, "비밀번호가 맞지 않습니다."));
    }
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);

    return res
      .status(200)
      .send(authUtil.jwtSent(200, "유저 로그인 성공", accessToken, refreshToken));
  } catch (err) {
    console.error(err);
    return res.status(500).send(authUtil.successFalse(500, "로그인 실패"));
  }
};

module.exports = login;
