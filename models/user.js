const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(250),
          allowNull: false,
        },

        name: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        age: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },

        businessName: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        businessNum: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        type: {
          type: Sequelize.ENUM,
          values: ["common", "company"],
          defaultValue: "common",
        },
      },
      {
        sequelize,
        modelName: "Users",
        tableName: "users",
        timestamps: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Event, { foreignKey: "author", targetKey: "id" });
    // db.User.belongsToMany(db.Event, {
    //   through: "UserEvents",
    //   foreignKey: "userId",
    //   otherKey: "eventId",
    // });
  }
};
