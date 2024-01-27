const { Sequelize } = require("sequelize");
const User = require("./user.js");
const Event = require("./event");
const UserEvent = require("./userEvent.js");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.js")[env];
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.User = User;
db.Event = Event;
db.UserEvent = UserEvent;

User.init(sequelize);
Event.init(sequelize);
UserEvent.init(sequelize);

User.associate(db);
Event.associate(db);
UserEvent.associate(db);

module.exports = db;
