const { Event, UserEvent } = require("../../models");
const { findAll } = require("../../models/user");
const authUtil = require("../../response/authUtil");
const { Sequelize } = require("sequelize");

const myEventByInProgress = async (req, res) => {
  try {
    const currentDate = new Date();

    const events = await Event.findAll({
      where: {
        startDate: {
          [Sequelize.Op.lte]: currentDate,
        },
        endDate: {
          [Sequelize.Op.gte]: currentDate,
        },
        author: req.user.id,
      },
    });
    if (!events[0]) {
      return res
        .status(200)
        .send(authUtil.successTrue(204, "이벤트가 존재하지 않습니다."));
    }
    return res
      .status(200)
      .send(
        authUtil.successTrue(200, "나의 이벤트(진행 중) 조회 성공", events)
      );
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send(authUtil.successFalse(500, "나의 이벤트 조회 실패"));
  }
};

const myEventByEnded = async (req, res) => {
  try {
    const currentDate = new Date();

    const events = await Event.findAll({
      where: {
        endDate: {
          [Sequelize.Op.lt]: currentDate, 
        },
        author: req.user.id,
      },
    });
    if (!events[0]) {
      return res
        .status(200)
        .send(authUtil.successTrue(204, "이벤트가 존재하지 않습니다."));
    }
    return res
      .status(200)
      .send(
        authUtil.successTrue(200, "나의 이벤트(진행 종료) 조회 성공", events)
      );
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send(authUtil.successFalse(500, "나의 이벤트 조회 실패"));
  }
};

const myEvent = async (req, res) => {
  try {
    const userId = req.user.id; // 로그인한 사용자의 ID
    const userEvents = await Event.findAll({
      where: {
        author: userId,
      },
    });

    return res.status(200).send({ userEvents });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: "이벤트 조회 중 오류가 발생했습니다." });
  }
};

module.exports = { myEventByInProgress, myEventByEnded, myEvent };
