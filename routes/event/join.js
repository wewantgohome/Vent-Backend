
const { UserEvent, Event, User } = require("../../models");

const joinEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { id } = req.user;
    const { description } = req.body;
    const filePath = !req.file ? null : req.file.path;
    const event = await Event.findByPk(eventId);
    const user = await User.findByPk(id);
    if (!event || !user) {
      return res
        .status(404)
        .send({ message: "이벤트 또는 사용자를 찾을 수 없습니다." });
    }

    const isAlreadyApplied = await UserEvent.findOne({
      where: {
        userId: id,
        eventId,
      },
    });
    if (isAlreadyApplied) {
      return res.status(400).send({ message: "이미 이벤트에 신청하였습니다." });
    }

    const userEvent = await UserEvent.create({
      userId: id,
      eventId,
      verifyImg : filePath,
      description,
    });

    return res.status(200).send({ message: "이벤트 신청 성공", userEvent });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: "이벤트 신청 중 오류가 발생했습니다." });
  }
};

module.exports = joinEvent;
