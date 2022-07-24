'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notebook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Notebook.belongsTo(models.User, {foreignKey : 'userId'})
      Notebook.hasMany(models.Note,{foreignKey : 'notebookId'})
      Notebook.belongsToMany(models.Tag, {through : models.NotebookTag, foreignKey : 'notebookId'})
    }
  }
  Notebook.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Notebook',
  });
  return Notebook;
};