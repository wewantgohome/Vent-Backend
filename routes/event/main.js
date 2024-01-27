const { Event, User } = require("../../models");

const commonEvent = async (req, res) => {
  try {
    const commonUserId = await User.findOne({
      where: { type: "common" },
      attributes: ["id"],
    });

    if (!commonUserId) {
      return res
        .status(404)
        .send({ message: "Common 유저를 찾을 수 없습니다." });
    }

    const commonEvents = await Event.findAll({
      where: { author: commonUserId.id },
    });

    return res.status(200).send({ commonEvents });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "이벤트 조회 중 오류가 발생했습니다." });
  }
};

module.exports = commonEvent;
