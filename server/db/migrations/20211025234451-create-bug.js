'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bugs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      details: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      steps: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      version: {
        allowNull: false,
        type: Sequelize.STRING(15),
      },
      priority: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      assignedTo: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users' }
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Bugs');
  }
};