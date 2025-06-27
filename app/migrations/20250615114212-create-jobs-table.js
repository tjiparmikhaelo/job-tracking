/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jobs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      company: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: 'company'
      },
      position: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: 'position'
      },
      status: {
        type: Sequelize.ENUM('applied', 'interview', 'offer', 'rejected', 'withdrawn'),
        allowNull: false,
        defaultValue: 'applied'
      },
      applicationDate: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'application_date'
      },
      jobUrl: {
        type: Sequelize.STRING(255),
        field: 'job_url'
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      salary: {
        type: Sequelize.STRING(40),
        allowNull: true
      },
      location: {
        type: Sequelize.STRING(40),
        allowNull: true
      },
      contactEmail: {
        type: Sequelize.STRING(40),
        allowNull: true,
        field: 'contact_email'
      },
      followUpDate: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'follow_up_date'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'created_at'
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'updated_at'
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'deleted_at'
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('jobs');
  }
};