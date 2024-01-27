const { Sequelize } = require("sequelize");
const User = require("./user");
const Business = require("./business");
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
db.Business = Business;
db.Event = Event;

User.init(sequelize);
Business.init(sequelize);
Event.init(sequelize);

User.associate(db);
Business.associate(db);
Event.associate(db);

module.exports = db;
