"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Brand.belongsTo(models.Category, {
        foreignKey: "cateId",
        targetKey: "id",
        as: "categoryData",
      });
      Brand.hasMany(models.Product, { foreignKey: 'id', as: 'brandData'})
    }
  }
  Brand.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Brand",
    }
  );
  return Brand;
};
