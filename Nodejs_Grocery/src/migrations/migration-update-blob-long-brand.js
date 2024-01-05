"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("brands", "image", {
        type: Sequelize.BLOB("long"),
        allowNull: true,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("brands", "image", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },
};
