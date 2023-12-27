"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Discount.hasMany(models.Product, {
        foreignKey: "id",
        as: "discountData",
      });
    }
  }
  Discount.init(
    {
      discountPercentage: DataTypes.DECIMAL,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Discount",
    }
  );
  return Discount;
};
