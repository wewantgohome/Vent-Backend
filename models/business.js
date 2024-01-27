const Sequelize = require("sequelize");

module.exports = class Business extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        businessId: {
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
        businessNum: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Business",
        tableName: "business",
        timestamps: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
      }
    );
  }
  static associate(db) {
    db.Business.hasMany(db.Event, {foreignKey :'author', sourceKey :'id'})
  }
};
