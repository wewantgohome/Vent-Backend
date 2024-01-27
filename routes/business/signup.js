const { Business } = require("../../models");
const bcrypt = require("bcrypt");
const authUtil = require("../../response/authUtil");

const signup = async (req, res) => {
  const { businessId, pwd, pwdCheck, businessName, businessNum } = req.body;
  const salt = await bcrypt.genSalt(10);
  try {
    if (pwd !== pwdCheck) {
      return res
        .status(200)
        .send(authUtil.successTrue(400, "패스워드가 맞지 않습니다."));
    }
    const hashedPwd = await bcrypt.hash(pwd, salt);
    const intBussinessNum = parseInt(businessNum);
    await Business.create({
      businessId,
      password: hashedPwd,
      businessName,
      businessNum: intBussinessNum,
    });
    return res
      .status(201)
      .send(authUtil.successTrue(201, "비지니스 회원가입에 성공하였습니다."));
  } catch (err) {
    console.error(err);
    return res.status(500).send(authUtil.successFalse(500, "회원가입 실패"));
  }
};

module.exports = signup;
