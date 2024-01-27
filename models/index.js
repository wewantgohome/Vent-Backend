const { Sequelize } = require("sequelize");
const User = require("./user");
const Event = require("./event");
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

User.init(sequelize);
Event.init(sequelize);

User.associate(db);
Event.associate(db);

module.exports = db;
