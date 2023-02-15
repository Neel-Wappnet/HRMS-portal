'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      empCode: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      fullName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password:{
        allowNull:false,
        type:Sequelize.STRING
      },
      personalEmail: {
        allowNull: false,
        type: Sequelize.STRING
      },
      company: {
        allowNull: false,
        type: Sequelize.STRING
      },
      department: {
        allowNull: false,
        type: Sequelize.STRING
      },
      designation: {
        allowNull: false,
        type: Sequelize.STRING
      },
      bloodGroup: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gender: {
        allowNull: false,
        type: Sequelize.STRING
      },
      birthDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      maritalStatus: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      maritalDate: {
        allowNull: true,
        type: Sequelize.DATE
      },
      physicalHandicapped: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      noteForHandicapped: {
        allowNull: true,
        type: Sequelize.STRING
      },
      joiningDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      reportingUser: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};