"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("products", {
        // name: DataTypes.STRING,
        // image: DataTypes.STRING,
        // price: DataTypes.INTEGER,
        // description: DataTypes.STRING,
        // stockQuantity: DataTypes.INTEGER,
        // cateId: DataTypes.INTEGER,
        // brandId: DataTypes.INTEGER,
        // discountId: DataTypes.INTEGER,
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING,
      },
      stockQuantity: {
        type: Sequelize.INTEGER,
      },
      cateId: {
        type: Sequelize.INTEGER,
      },
      brandId: {
        type: Sequelize.INTEGER,
      },
      discountId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("products");
  },
};
