"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.hasMany(models.OrderDetail, {
        foreignKey: "id",
        as: "orderData",
      });
      Order.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "orderUserData",
      });
    }
  }
  Order.init(
    {
      userId: DataTypes.INTEGER,
      receiver: DataTypes.STRING,
      totalPrice: DataTypes.INTEGER,
      addressDelivery: DataTypes.STRING,
      paymentMethod: DataTypes.STRING,
      note: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
