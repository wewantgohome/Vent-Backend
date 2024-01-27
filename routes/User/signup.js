const { User } = require("../../models");
const bcrypt = require("bcrypt");
const authUtil = require("../../response/authUtil");

const signup = async (req, res) => {
  const { userId, pwd, name, age } = req.body;
  const salt = await bcrypt.genSalt(10);
  try {
    const intAge = parseInt(age);
    const hashedPwd = await bcrypt.hash(pwd, salt);
    await User.create({
      userId,
      password: hashedPwd,
      name: name,
      age: intAge,
    });
    return res
      .status(201)
      .send(authUtil.successTrue(201, "유저 회원가입에 성공하였습니다."));
  } catch (err) {
    console.error(err);
    return res.status(500).send(authUtil.successFalse(500, "회원가입 실패"));
  }
};

module.exports = signup;
