const { Event } = require("../../models");
const authUtil = require("../../response/authUtil");

const createEvent = async (req, res) => {
  let status = "NotStarted";
  const now = new Date();
  console.log(now);
  const { eventName, description, link, startDate, endDate, price, place } =
    req.body;
  try {
    console.log(req.file);
    const filePath = !req.file ? null : req.file.path;
    const formatStartDate = new Date(startDate);
    const formatEndDate = new Date(endDate);
    const intPrice = parseInt(price);
    if (now > formatStartDate) {
      status = "InProgress";
    }
    await Event.create({
      eventName,
      description,
      link,
      startDate: formatStartDate,
      endDate: formatEndDate,
      status: status,
      place,
      price: intPrice,
      author: req.user.id,
      eventImg: filePath,
    });
    return res.status(201).send(authUtil.successTrue(201, "이벤트 생성 완료"));
  } catch (err) {
    console.error(err);
    return res.status(500).send(authUtil.successFalse(500, "이벤트 생성 실패"));
  }
};

module.exports = createEvent;
