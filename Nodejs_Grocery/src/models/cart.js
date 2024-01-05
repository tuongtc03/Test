"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "userData",
      });
      Cart.belongsTo(models.Product, {
        foreignKey: "productId",
        targetKey: "id",
        as: "productData",
      });
    }
  }
  Cart.init(
    {
      userId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      subtotalPrice: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
