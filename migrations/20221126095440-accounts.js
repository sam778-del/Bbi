'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('accounts', { 
      id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      account_id: {
        type: Sequelize.STRING,
      },
      lifetime_export: {
        type: Sequelize.DATE,
      },
      lastdaily_export: {
        type: Sequelize.DATE,
      },
      validity: {
        type: Sequelize.STRING,
      },
      client_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id'
        },
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('accounts');
  }
};
