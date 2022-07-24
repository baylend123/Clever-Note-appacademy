'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NotebookTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  NotebookTag.init({
    notebookId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'NotebookTag',
  });
  return NotebookTag;
};