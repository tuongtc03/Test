"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("brands", "cateId", {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("brands", "cateId", {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
    ]);
  },
};
