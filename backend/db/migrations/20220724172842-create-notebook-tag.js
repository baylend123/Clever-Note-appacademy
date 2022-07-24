'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NotebookTags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      notebookId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Notebooks',
          key : 'id'
        }
      },
      tagId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Tags',
          key : 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue : Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue : Sequelize.literal("CURRENT_TIMESTAMP")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('NotebookTags');
  }
};