const { Event, User } = require("../../models");

const commonEvents = async (req, res) => {
  try {
    const commonUsers = await User.findAll({
      where: {
        type: "common",
      },
    });
    const commonUserIds = commonUsers.map((user) => user.id);
    const commonEven = await Event.findAll({
      where: {
        author: commonUserIds,
      },
    });

    return res.status(200).json({ commonEven });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "이벤트 조회 중 오류가 발생했습니다." });
  }
};

const companyEvents = async (req, res) => {
  try {
    const commonUsers = await User.findAll({
      where: {
        type: "company",
      },
    });
    const companyUserIds = commonUsers.map((user) => user.id);
    const companyEven = await Event.findAll({
      where: {
        author: companyUserIds,
      },
    });

    return res.status(200).json({ companyEven });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "이벤트 조회 중 오류가 발생했습니다." });
  }
};

module.exports = { commonEvents, companyEvents };
