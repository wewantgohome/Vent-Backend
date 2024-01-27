const Sequelize = require("sequelize");

module.exports = class UserEvent extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        eventId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        verifyImg: {
          type: Sequelize.STRING(500),
          allowNull: true,
        },
        description: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "UserEvent",
        tableName: "userEvents",
        timestamps: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
      }
    );
  }

  static associate(db) {
    db.UserEvent.belongsTo(db.User, { foreignKey: "userId" });
    db.UserEvent.belongsTo(db.Event, { foreignKey: "eventId" });
  }
};
