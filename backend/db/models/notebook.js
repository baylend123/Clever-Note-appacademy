'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,

    },

    title: {
      allowNull: false,
      type: DataTypes.STRING(60),

    },
    tags: {
      type: DataTypes.STRING(255),
      allowNull: false,

    }
  }, {});
  Notebook.associate = function (models) {
    // associations can be defined here
    Notebook.hasMany(models.Note, { foreignKey: 'noteBookId' })
    Notebook.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Notebook;
};