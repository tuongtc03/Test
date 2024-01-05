"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    static associate(models) {
      OrderDetail.belongsTo(models.Order, {
        foreignKey: "orderId",
        targetKey: "id",
        as: "orderData",
      });
      OrderDetail.belongsTo(models.Product, {
        foreignKey: "productId",
        targetKey: "id",
        as: "productData",
      });
    }
  }
  OrderDetail.init(
    {
      orderId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      subtotalPrice: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderDetail",
    }
  );
  return OrderDetail;
};
