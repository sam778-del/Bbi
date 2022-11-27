'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('users', { 
      id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_name: {
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
      provider: {
        type: Sequelize.STRING,
      },
      refresh_token: {
        type: Sequelize.TEXT('long'),
      },
      g_account: {
        type: Sequelize.TEXT('long'),
      },
      fb_account: {
        type: Sequelize.TEXT('long'),
      },
      sector: {
        type: Sequelize.STRING,
      },
      subsector: {
        type: Sequelize.STRING,
      },
      clientnotes: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('users');
  }
};
