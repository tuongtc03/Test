"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        userName: "tuongmt",
        password: "123456",
        email: "tuongmt@gmail.com",
        fullName: "Tuong Ma",
        address: "Tra Vinh, VietNam",
        phoneNumber: "0386040650",
        gender: "1",
        image: "",
        roleId: "R2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
