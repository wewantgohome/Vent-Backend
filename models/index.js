const { Sequelize } = require("sequelize");
const User = require("./user");
const Bussiness = require("./business");
const env = process.env.NODE_ENV || 'development';
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
db.Bussiness = Bussiness;

User.init(sequelize);
Bussiness.init(sequelize);

User.associate(db);
Bussiness.associate(db);

module.exports = db;
