const Sequelize = require("sequelize");

module.exports = class Business extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        bussinessId: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },

        businessName: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        bussinessNum: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Bussiness",
        tableName: "bussiness",
        timestamps: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
      }
    );
  }
  static associate(db) {}
};
