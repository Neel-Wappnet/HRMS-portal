// 'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      empCode: 00000,
      fullName: "Super Admin",
      email: "admin@wappnet.com",
      personalEmail: "admin@admin.com",
      company: "Wappnet Systems",
      department: "MD",
      designation:"CEO",
      bloodGroup: "B+",
      gender: "Male",
      birthDate: new Date(1992, 02, 05),
      maritalStatus: true,
      maritalDate: new Date(2005, 01, 01),
      physicalHandicapped: false,
      noteForHandicapped:undefined,
      joiningDate: new Date(2005, 01, 01),
      reportingUser: "Super Admin",
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
