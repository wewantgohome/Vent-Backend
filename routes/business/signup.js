const { User } = require("../../models");
const bcrypt = require("bcrypt");
const authUtil = require("../../response/authUtil");

const signup = async (req, res) => {
  const { businessId, pwd, businessName, businessNum } = req.body;
  const salt = await bcrypt.genSalt(10);
  try {

    const hashedPwd = await bcrypt.hash(pwd, salt);
    const intBussinessNum = parseInt(businessNum);
    await User.create({
      userId : businessId,
      password: hashedPwd,
      type : "company",
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
