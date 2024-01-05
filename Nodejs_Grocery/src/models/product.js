"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: "cateId",
        targetKey: "id",
        as: "categoryData",
      });
      Product.belongsTo(models.Brand, {
        foreignKey: "brandId",
        targetKey: "id",
        as: "brandData",
      });
      Product.belongsTo(models.Discount, {
        foreignKey: "discountId",
        targetKey: "id",
        as: "discountData",
      });
      Product.hasMany(models.Cart, {
        foreignKey: "id",
        as: "productData",
      });
      Product.hasMany(models.OrderDetail, {
        foreignKey: "id",
        as: "productData1",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.STRING,
      stockQuantity: DataTypes.INTEGER,
      cateId: DataTypes.INTEGER,
      brandId: DataTypes.INTEGER,
      discountId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
