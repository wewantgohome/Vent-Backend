const { Event } = require("../../models");
const authUtil = require("../../response/authUtil");
const { sequelize } = require("sequelize");

const eventDetail = async (req, res) => {
  const param = parseInt(req.params.id);

  try {
    const event = await Event.findOne({
      where: {
        id: param,
      },
    });
    if (!event) {
      return res
        .status(200)
        .send(authUtil.successTrue(404, "존재하지 않는 이벤트 입니다."));
    }
    const result = await Event.update(
      { views: ++event.views },
      {
        where: {
          id: param,
        },
      }
    );
    const events = await Event.findOne({
      where: {
        id: param,
      },
    });
    const online = event.place.length === 0;
    return res.status(200).send(
      authUtil.successTrue(200, "이벤트 상세보기 조회 성공", {
        ...events,
        online,
      })
    );
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send(authUtil.successFalse(500, "이벤트 상세 불러오기 실패"));
  }
};

module.exports = eventDetail;
