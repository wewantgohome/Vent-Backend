const Sequelize = require("sequelize");

module.exports = class Event extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        eventName: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING(3000),
          allowNull: false,
        },

        link: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        startDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        endDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        price: {
          type: Sequelize.INTEGER(20),
          allowNull: false,
        },
        status: {
          type: Sequelize.ENUM,
          values: ["NotStarted", "InProgress", "Ended"],
          allowNull: false,
        },
        place: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Event",
        tableName: "events",
        timestamps: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
      }
    );
  }
  static associate(db) {
    db.Event.belongsTo(db.User, { foreignKey: "author", targetKey: "id" });
  }
};
