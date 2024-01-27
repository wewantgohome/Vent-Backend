const { User } = require("../../models");
const bcrypt = require("bcrypt");
const authUtil = require("../../response/authUtil");

const signup = async (req, res) => {
  const { userId, pwd, pwdCheck, name, age } = req.body;
  const salt = await bcrypt.genSalt(10);
  try {
    if (pwd !== pwdCheck) {
      return res
        .status(200)
        .send(authUtil.successTrue(400, "패스워드가 맞지 않습니다."));
    }
    const intAge = parseInt(age);
    const hashedPwd = await bcrypt.hash(pwd, salt);
    const user = await User.create({
      userId,
      password: hashedPwd,
      name: name,
      age: intAge,
    });
    return res
      .status(201)
      .send(authUtil.successTrue(201, "회원가입에 성공하였습니다."));
  } catch (err) {
    console.error(err);
    return res.status(500).send(authUtil.successFalse(500, "회원가입 실패"));
  }
};

module.exports = signup;
